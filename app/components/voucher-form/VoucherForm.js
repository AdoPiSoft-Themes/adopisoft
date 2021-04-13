define([
  'knockout',
  'toast',
  'rootVM',
  'app/services/http',
  'app/observables/session',
  'app/services/sessions'
], function (ko, toast, rootVM, http, Session, sessions) {
  ko.components.register('voucher-form', {
    viewModel: function(code) {
      if (code) this.value = (typeof code === 'function') ? code : ko.observable(code);
      else this.value = ko.observable('');
      this.activate = function() {
        var code = this.value();
        http.activateVoucher(code, function(err, data) {
          if (err) return toast.error(err);
          var s = new Session(data);
          sessions.get().push(s);
          if (sessions.hasRunning()) {
            toast.success('Voucher activated successfully!');
          } else {
            s.startSession();
          }
          rootVM.navigate('home-page');
        });
      };
    },
    template: {require: 'text!app/components/voucher-form/voucher-form.html'}
  });
});
