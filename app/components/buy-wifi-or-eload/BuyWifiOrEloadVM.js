define([
  'knockout',
  'rootVM',
  'app/services/config',
  'app/observables/payment',
  'app/observables/customer'
], function (ko, rootVM, config, payment, customer) {
  return function () {
    var self = this;
    this.loading = ko.observable(false);
    this.eloadLoading = ko.observable(false);
    this.customer = customer;

    this.showBuyVoucherBtn = ko.observable(config.findField('buttons', 'button_buy_voucher'));
    this.showBuyEloadBtn = ko.observable(config.findField('buttons', 'button_buy_eload'));
    this.showBuyWifiBtn = ko.observable(config.findField('buttons', 'button_buy_wifi'));

    this.buyWifi = function () {
      this.loading(true);
      payment.intent('wifi');
      payment.isVoucher(false);
      payment.rateType('');
      rootVM.navigate('buy-wifi-buttons');
    };

    this.buyEload = function () {
      this.eloadLoading(true);
      rootVM.navigate('buy-eload-page');
    };

    this.topupWallet = function() {
      self.loading(true);
      payment.isVoucher(false);
      payment.intent('wallet_topup');
      payment.rateType('wallet_topup');
      rootVM.navigate('select-coinslot-page');
    };

    this.koDescendantsComplete = function () {
      rootVM.showingStatusNav(true);
      rootVM.showingBanners(true);
      rootVM.showingSessionsTable(true);
    };

    customer.fetch(function() { });

  };
});
