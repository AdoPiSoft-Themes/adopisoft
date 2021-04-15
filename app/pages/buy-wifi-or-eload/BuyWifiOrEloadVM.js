define([
  'knockout',
  'rootVM',
  'app/services/config',
  'app/observables/payment'
],function (ko, rootVM, config, payment) {
  return function () {
    this.loading = ko.observable(false);
    this.eloadLoading = ko.observable(false);

    this.showBuyVoucherBtn = ko.observable(config.findField('buttons', 'button_buy_voucher'));
    this.showBuyEloadBtn = ko.observable(config.findField('buttons', 'button_buy_eload'));
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

    this.buyEload = function () {
      this.eloadLoading(true);
      rootVM.navigate('buy-eload-page');
    };

    this.koDescendantsComplete = function () {
      rootVM.showingStatusNav(true);
      rootVM.showingBanners(true);
      rootVM.showingSessionsTable(true);
    };
  };
});
