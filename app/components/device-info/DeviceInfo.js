define([
  'knockout',
  'app/observables/device',
  'modal',
  'app/components/passcode-modal/PasscodeModal'
], function(ko, device, modal) {
  ko.components.register('device-info', {
    viewModel: function() {
      var self = this
      self.device = device;

      self.editPasscode = function () {
        modal.show('passcode-modal')
      }

      self.dispose = function () {
        modal.hide()
      }
    },
    template: {require: 'text!app/components/device-info/device-info.html'}
  });
});
