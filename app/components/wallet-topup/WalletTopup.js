define([
  'knockout',
  'app/utils/array.includes'
], function(ko, includes) {

  function VM(params) {
    var self = this;
    self.loading = params.loading;
    self.que = params.que;
    self.rates = params.rates;
    self.hasPayment = params.hasPayment;
    self.donePayment = params.donePayment;

    self.eload_wallet_topup = ko.observable(false);
    self.eload_wallet_topup(includes(['eload', 'wallet_topup'], self.que.type()));
  }

  ko.components.register('wallet-topup', {
    viewModel: VM,
    template: {require: 'text!app/components/wallet-topup/wallet-topup.html'}
  });

});
