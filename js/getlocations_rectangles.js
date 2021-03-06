
/**
 * @file
 * getlocations_rectangles.js
 * @author Bob Hutchinson http://backdrop.org/user/52366
 * @copyright GNU GPL
 *
 * Javascript functions for getlocations rectangles support
 * jquery stuff
*/
(function ($) {
  Backdrop.behaviors.getlocations_rectangles = {
    attach: function() {

      // bail out
      if (typeof Backdrop.settings.getlocations_rectangles === 'undefined') {
        return;
      }

      var default_rectangle_settings = {
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 3,
        fillColor: '#FF0000',
        fillOpacity: 0.35
      };

      $.each(Backdrop.settings.getlocations_rectangles, function (key, settings) {

        var strokeColor = (settings.strokeColor ? settings.strokeColor : default_rectangle_settings.strokeColor);
        if (! strokeColor.match(/^#/)) {
          strokeColor = '#' + strokeColor;
        }
        var strokeOpacity = (settings.strokeOpacity ? settings.strokeOpacity : default_rectangle_settings.strokeOpacity);
        var strokeWeight = (settings.strokeWeight ? settings.strokeWeight : default_rectangle_settings.strokeWeight);
        var fillColor = (settings.fillColor ? settings.fillColor : default_rectangle_settings.fillColor);
        if (! fillColor.match(/^#/)) {
          fillColor = '#' + fillColor;
        }
        var fillOpacity = (settings.fillOpacity ? settings.fillOpacity : default_rectangle_settings.fillOpacity);
        var clickable = (settings.clickable ? settings.clickable : default_rectangle_settings.clickable);
        var message = (settings.message ? settings.message : default_rectangle_settings.message);

        var rectangles = settings.rectangles;
        var p_strokeColor = strokeColor;
        var p_strokeOpacity = strokeOpacity;
        var p_strokeWeight = strokeWeight;
        var p_fillColor = fillColor;
        var p_fillOpacity = fillOpacity;
        var p_clickable = clickable;
        var p_message = message;
        var rc = [];
        for (var i = 0; i < rectangles.length; i++) {
          rc = rectangles[i];
          if (rc.coords) {
            if (rc.strokeColor) {
              if (! rc.strokeColor.match(/^#/)) {
                rc.strokeColor = '#' + rc.strokeColor;
              }
              p_strokeColor = rc.strokeColor;
            }
            if (rc.strokeOpacity) {
              p_strokeOpacity = rc.strokeOpacity;
            }
            if (rc.strokeWeight) {
              p_strokeWeight = rc.strokeWeight;
            }
            if (rc.fillColor) {
              if (! rc.fillColor.match(/^#/)) {
                rc.fillColor = '#' + rc.fillColor;
              }
              p_fillColor = rc.fillColor;
            }
            if (rc.fillOpacity) {
              p_fillOpacity = rc.fillOpacity;
            }
            if (rc.clickable) {
              p_clickable = rc.clickable;
            }
            if (rc.message) {
              p_message = rc.message;
            }
            p_clickable = (p_clickable ? true : false);
            var mcoords = [];
            var rect = [];
            scoords = rc.coords.split("|");
            for (var s = 0; s < scoords.length; s++) {
              var ll = scoords[s];
              var lla = ll.split(",");
              mcoords[s] = new google.maps.LatLng(parseFloat(lla[0]), parseFloat(lla[1]));
            }
            if (mcoords.length == 2) {
              var rectOpts = {};
              rectOpts.bounds = new google.maps.LatLngBounds(mcoords[0], mcoords[1]);
              rectOpts.strokeColor = p_strokeColor;
              rectOpts.strokeOpacity = p_strokeOpacity;
              rectOpts.strokeWeight = p_strokeWeight;
              rectOpts.fillColor = p_fillColor;
              rectOpts.fillOpacity = p_fillOpacity;
              rectOpts.clickable = p_clickable;
              rectOpts.map = Backdrop.getlocations_map[key];
              rect[i] = new google.maps.Rectangle(rectOpts);

              if (p_clickable && p_message) {
                google.maps.event.addListener(rect[i], 'click', function(event) {
                  // close any previous instances
                  if (pushit) {
                    for (var i in Backdrop.getlocations_settings[key].infoBubbles) {
                      Backdrop.getlocations_settings[key].infoBubbles[i].close();
                    }
                  }
                  if (Backdrop.getlocations_settings[key].markeraction == 2) {
                    // infobubble
                    if (typeof(infoBubbleOptions) == 'object') {
                      var infoBubbleOpts = infoBubbleOptions;
                    }
                    else {
                      var infoBubbleOpts = {};
                    }
                    infoBubbleOpts.content = p_message;
                    infoBubbleOpts.position = event.latLng;
                    var iw = new InfoBubble(infoBubbleOpts);
                  }
                  else {
                    // infowindow
                    if (typeof(infoWindowOptions) == 'object') {
                      var infoWindowOpts = infoWindowOptions;
                    }
                    else {
                      var infoWindowOpts = {};
                    }
                    infoWindowOpts.content = p_message;
                    infoWindowOpts.position = event.latLng;
                    var iw = new google.maps.InfoWindow(infoWindowOpts);
                  }
                  iw.open(Backdrop.getlocations_map[key]);
                  if (pushit) {
                    Backdrop.getlocations_settings[key].infoBubbles.push(iw);
                  }
                });
              }
            }
          }
        }
      });
    }
  };
})(jQuery);
