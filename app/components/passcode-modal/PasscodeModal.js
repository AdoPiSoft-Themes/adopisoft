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
    self.submitting = ko.observable(false);
    self.submitPasscode = function () {
      if(self.validPasscode()){
        self.submitting(true)
        http.submitPasscode(self.passcode(), function(err) {
          self.submitting(false)
          if (err) {
            http.catchError(err)
          } else {
            toast.success('Passcode successfully set');
            device.passcode(self.passcode());
            params.close();
          }
        });
      }else{
        toast.error("Error", "Combination of letters and numbers required.")
      }
    };

    self.validPasscode = function() {
      const alpha_numberic_regex = /(?!^[0-9]*$)(?!^[a-zA-Z]*$)^([a-zA-Z0-9]{6,15})$/
      return alpha_numberic_regex.test(self.passcode())
    }

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
