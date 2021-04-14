define([
  'knockout',
  'rootVM',
  'app/services/config',
  'app/observables/payment'
],function (ko, rootVM, config, payment) {
  return function () {
    this.loading = ko.observable(false);
    this.showBuyVoucherBtn = ko.observable(config.findField('buttons', 'button_buy_voucher').value);
    this.buyWifi = function () {
      this.loading(true);
      payment.intent('wifi');
      payment.isVoucher(false);
      payment.rateType('');
      rootVM.navigate('buy-wifi-buttons');
    };
    this.buyVoucher = function () {
      this.loading(true);
      payment.intent('wifi');
      payment.isVoucher(true);
      payment.rateType('');
      rootVM.navigate('buy-wifi-buttons');
    };
    this.koDescendantsComplete = function () {
      rootVM.showingStatusNav(true);
      rootVM.showingBanners(true);
      rootVM.showingSessionsTable(true);
    };
  };
});
