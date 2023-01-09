define([
  'knockout',
  'toast',
  'rootVM',
  'http',
  'sessions',
  'translator',
  'app/observables/session',
  'app/services/config',
  'text!app/components/voucher-form/voucher-form.html'
], function (ko, toast, rootVM, http, sessions, translator, Session, config, tpl) {
  ko.components.register('voucher-form', {
    viewModel: function(code) {
      var self = this;
      self.loading = ko.observable(false);
      if (code) self.value = (typeof code === 'function') ? code : ko.observable(code);
      else self.value = ko.observable('');

      self.showActivateVoucherForm = ko.observable(config.findField('forms', 'activate_voucher_form'));
      self.activate = function() {
        self.loading(true);
        var code = self.value();
        http.activateVoucher(code, function(err, data) {
          self.loading(false);
          if (err) return http.catchError(err);
          var s = new Session(data);
          sessions.get().push(s);
          toast.success(translator.print('VOUCHER_ACTIVATED'));
          self.value('');
          rootVM.navigate('home-page');
        });
      };
      self.voucher_code_text = translator.print('VOUCHER_CODE');
    },
    template: tpl
  });
});
