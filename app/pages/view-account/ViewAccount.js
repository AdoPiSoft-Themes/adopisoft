define([
  'knockout',
  'rootVM',
  'app/observables/payment'
], function (ko, rootVM, payment) {
  ko.components.register('view-account', {
    viewModel: function () {
      var self = this;
      this.loading = ko.observable(false)

      self.topupWallet = function () {
        self.loading(true)
        payment.isVoucher(false);
        payment.intent('wallet_topup');
        payment.rateType('wallet_topup');
        rootVM.navigate('select-coinslot-page');      
      }
    },
    template: {require: 'text!app/pages/view-account/view-account.html'}
  })
})