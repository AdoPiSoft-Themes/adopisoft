define([
  'knockout',
  'rootVM',
  'app/services/config',
  'app/observables/customer'
], function(ko, rootVM, config, customer) {
  ko.components.register('more-buttons', {
    viewModel: function () {
      this.config = config;
      this.customer = customer;

      this.showMyAccountBtn = ko.observable(config.findField('buttons', 'button_my_account'));
      this.showBuyVoucherBtn = ko.observable(config.findField('buttons', 'button_buy_voucher'));

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
