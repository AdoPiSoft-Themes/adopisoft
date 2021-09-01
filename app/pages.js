define([
  'knockout',
  'rootVM',
  'app/services/config',
  'app/observables/customer'
], function(ko, rootVM, config, customer) {

  ko.components.register('buy-eload-page', {
    viewModel: {require: 'app/pages/buy-eload/BuyEloadPageVM'},
    template: {require: 'text!app/pages/buy-eload/buy-eload-page.html'}
  });

  ko.components.register('home-page', {
    viewModel: function () {
      this.koDescendantsComplete = function() {
        rootVM.showingBanners(true);
        rootVM.showingSessionsTable(true);
        rootVM.showingStatusNav(true);
      };
    },
    template: { require: 'text!app/pages/home/home-page.html' }
  });

  ko.components.register('insert-coin-page', {
    viewModel: { require: 'app/pages/insert-coin/InsertCoinVM' },
    template: { require: 'text!app/pages/insert-coin/insert-coin-page.html' }
  });

  ko.components.register('more-buttons', {
    viewModel: function () {
      this.config = config;
      this.customer = customer;

      this.showMyAccountBtn = ko.observable(config.findField('buttons', 'button_my_account'));
      this.showViewVouchersBtn = ko.observable(config.findField('buttons', 'button_view_vouchers'));
      this.showViewRatesBtn = ko.observable(config.findField('buttons', 'button_view_rates'));

      this.koDescendantsComplete = function () {
        rootVM.showingStatusNav(true);
        rootVM.showingBanners(true);
        rootVM.showingSessionsTable(true);
        customer.fetch(function () {});
      };
    },
    template: {require: 'text!app/pages/more-buttons/more-buttons.html'}
  });

  ko.components.register('receipt-page', {
    viewModel: {require: 'app/pages/receipt-page/ReceiptPageVM'},
    template: {require: 'text!app/pages/receipt-page/receipt-page.html'}
  });

  ko.components.register('select-coinslot-page', {
    viewModel: {require: 'app/pages/select-coinslot/SelectCoinslotVM.js'},
    template: {require: 'text!app/pages/select-coinslot/select-coinslot-page.html'}
  });

  ko.components.register('view-rates', {
    viewModel: {require: 'app/pages/view-rates/ViewRatesVM'},
    template: {require: 'text!app/pages/view-rates/view-rates.html'}
  });

  ko.components.register('view-vouchers', {
    viewModel: {require: 'app/pages/view-vouchers/ViewVouchersVM'},
    template: {require: 'text!app/pages/view-vouchers/view-vouchers.html'}
  });

});
