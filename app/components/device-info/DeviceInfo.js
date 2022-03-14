define([
  'knockout',
  'http',
  'app/observables/device',
  'modal',
  'app/components/passcode-modal/PasscodeModal'
], function(ko,http, device, modal) {
  ko.components.register('device-info', {
    viewModel: function() {
      var self = this;
      self.device = device;
      self.enablePasscode = ko.observable(false);
      self.passcodeShown = ko.observable(false);
      self.showPasscode = function () {
        self.passcodeShown(true);
      };

      self.editPasscode = function () {
        modal.show('passcode-modal');
      };

      self.dispose = function () {
        modal.hide();
      };
      self.koDescendantsComplete = function () {
        http.timerConfig(function(err, data) {
          if(err) return self.enablePasscode(false);
          self.enablePasscode(data.enable_passcode);
        });
      };
    },
    template: {require: 'text!app/components/device-info/device-info.html'}
  });
});
