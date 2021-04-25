define([
  'knockout',
  'rootVM',
  'text!app/components/wallet-topup/wallet-topup.html'
], function(ko, rootVM, tpl) {

  function VM(params) {
    var self = this;
    self.loading = params.loading;
    self.que = params.que;
    self.rates = params.rates;
    self.hasPayment = params.hasPayment;
    self.donePayment = params.donePayment;
  }

  ko.components.register('wallet-topup', {
    viewModel: VM,
    template: tpl
  });

});
