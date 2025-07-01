define([
  'knockout'
], function(ko) {

  function VM(params) {
    var self = this;
    self.loading = params.loading;
    self.que = params.que;
    self.rates = params.rates;
    self.hasPayment = params.hasPayment;
    self.donePayment = params.donePayment;
    self.disable = params.disable
  }

  ko.components.register('wallet-topup', {
    viewModel: VM,
    template: {require: 'text!app/components/wallet-topup/wallet-topup.html'}
  });

});
