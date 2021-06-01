define([
  'knockout',
  'toast',
  'rootVM',
  'http'
], function (ko, toast, rootVM, http) {
  ko.components.register('voucher-form', {
    viewModel: function(code) {
      var self = this;
      if (code) self.value = (typeof code === 'function') ? code : ko.observable(code);
      else self.value = ko.observable('');
      self.activate = function() {
        var code = self.value();
        http.activateVoucher(code, function(err) {
          if (err) return http.catchError(err);
          toast.success('Voucher activated successfully!');
          self.value('');
          rootVM.navigate('home-page');
        });
      };
    },
    template: {require: 'text!app/components/voucher-form/voucher-form.html'}
  });
});
