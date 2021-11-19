define([
  'knockout',
  'app/services/toast',
  'core/rootVM',
  'app/services/http',
  'core/services/sessions',
  'core/services/translator',
  'core/observables/session'
], function (ko, toast, rootVM, http, sessions, translator, Session) {
  ko.components.register('voucher-form', {
    viewModel: function(code) {
      var self = this;
      if (code) self.value = (typeof code === 'function') ? code : ko.observable(code);
      else self.value = ko.observable('');
      self.activate = function() {
        var code = self.value();
        http.activateVoucher(code, function(err, data) {
          if (err) return http.catchError(err);
          var s = new Session(data);
          sessions.get().push(s);
          toast.success(translator.print('VOUCHER_ACTIVATED'));
          self.value('');
          rootVM.navigate('home-page');
        });
      };
      self.voucher_code_text = translator.print('VOUCHER_CODE')
    },
    template: {require: 'text!app/components/voucher-form/voucher-form.html'}
  });
});
