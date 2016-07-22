
/**
 * @file
 * getlocations_preview.js
 * @author Bob Hutchinson https://backdropcms.org/account/hutch
 * @copyright GNU GPL
 *
 * Javascript functions for getlocations_leaflet module for Backdrop 7
 * Manages the preview map in admin/config/getlocations/leaflet
 * this is for googlemaps API version 3
 */

(function ($) {

  Backdrop.behaviors.getlocations_leaflet_preview = {
    attach: function () {

      // bail out
      if (typeof Backdrop.settings.getlocations_leaflet === 'undefined') {
        return;
      }

      // first find the right map
      $.each(Backdrop.settings.getlocations_leaflet, function (key, settings) {

        // this is the one we want
        if (settings.extcontrol == 'preview_map') {
console.log('got preview_map');
          // an event handler on zoomend and getZoom()
          Backdrop.getlocations_leaflet_map[key].on('zoomend', function() {
            $("#edit-getlocations-leaflet-defaults-zoom").val(Backdrop.getlocations_leaflet_map[key].getZoom());
          });

          // an event handler on dragend and getCenter()
          Backdrop.getlocations_leaflet_map[key].on('dragend', function() {
            var ll = Backdrop.getlocations_leaflet_map[key].getCenter();
            $("#edit-getlocations-leaflet-defaults-latlong").val(ll.lat + ',' + ll.lng);
          });

        }
      });

    }
  };
})(jQuery);
