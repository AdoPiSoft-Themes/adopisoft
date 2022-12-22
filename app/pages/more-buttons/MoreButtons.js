define([
  'knockout',
  'rootVM',
  'app/services/config',
  'app/observables/customer',
  'app/observables/payment',
], function(ko, rootVM, config, customer, payment) {
  ko.components.register('more-buttons', {
    viewModel: function () {
      this.config = config;
      this.customer = customer;
      this.loading = ko.observable(false);

      this.showMyAccountBtn = ko.observable(config.findField('buttons', 'button_my_account'));
      this.showViewVouchersBtn = ko.observable(config.findField('buttons', 'button_view_vouchers'));
      this.showBuyVoucherBtn = ko.observable(config.findField('buttons', 'button_buy_voucher'));

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
        customer.fetch(function () {});
      };
    },
    template: {require: 'text!app/pages/more-buttons/more-buttons.html'}
  });
});
