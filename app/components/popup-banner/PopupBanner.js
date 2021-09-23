define([
  'knockout',
  'app/services/config'
], function (ko, config) {
  ko.components.register('popup-banner', {
    template: '<div id="popup-banner">' + config.findField('banners', 'popup_banner') + '</div>'
  });
});
