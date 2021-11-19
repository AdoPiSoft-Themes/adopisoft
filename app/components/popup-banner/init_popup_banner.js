define([
  'app/services/modal',
  'core/services/config',
  './PopupBanner'
], function (modal, config) {
  return function () {
    var bannerHtml = config.findField('banners', 'popup_banner');

    if (bannerHtml) {
      modal.show('popup-banner');
    }
  };
});
