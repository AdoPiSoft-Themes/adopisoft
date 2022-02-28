define([
  'knockout',
  'rootVM',
  'http',
  'app/observables/device',
  'text!app/components/passcode-modal/passcode-modal.html',
  'toast'
], function(ko, rootVM, http, device, tpl, toast) {

  function VM(params) {
    var self = this;
    self.device = device;
    self.passcode = ko.observable(device.passcode());
    self.submitPasscode = function () {
      http.submitPasscode(self.passcode(), function(err) {
        if (err) {
          http.catchError(err)
        } else {
          toast.success('Passcode successfully set');
          device.passcode(self.passcode());
          params.close();
        }
      });
    };

    self.koDescendantsComplete = function () {
      document.getElementById('passcode').focus();
    };
    self.close = params.close;
  }

  ko.components.register('passcode-modal', {
    viewModel: VM,
    template: tpl
  });

});
