define([
  'modal',
  'app/observables/device',
  'app/services/config',
  './PopupBanner',
  'app/components/passcode-modal/PasscodeModal'
], function (modal, device, config) {
  return function () {
    var bannerHtml = config.findField('banners', 'popup_banner');

    function showPasscodePrompt() {
      if (device.is_clone()) {
        modal.show('passcode-modal');
      }
    }

    if (bannerHtml) {
      modal.show('popup-banner', {onClose: showPasscodePrompt});
    } else {
      showPasscodePrompt();
    }
  };
});