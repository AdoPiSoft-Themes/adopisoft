define([
  'knockout',
  'rootVM',
  'http',
  'app/utils/array.map',
  'app/observables/payment',
  'app/services/config',
], function(ko, rootVM, http, map, payment, config) {
  ko.components.register('view-vouchers', {
    viewModel: function () {
      var self = this;
      self.config = config
      self.loading = ko.observable(false)
      self.showBuyVoucherBtn = ko.observable(config.findField('buttons', 'button_buy_voucher'))

      self.vouchers = ko.observableArray([]);
      self.koDescendantsComplete = function () {
        rootVM.showingStatusNav(true);
        rootVM.showingBanners(true);
        rootVM.showingSessionsTable(false);
      };
      self.buyVoucher = function () {
        this.loading(true);
        payment.intent('wifi');
        payment.isVoucher(true);
        payment.rateType('');
        rootVM.navigate('select-coinslot-page')
      }

      http.getVouchers(function (err, vouchers) {
        map(vouchers, function(v) {
          self.vouchers.push(v);
        });
      });
    },
    template: {require: 'text!app/pages/view-vouchers/view-vouchers.html'}
  });
});
