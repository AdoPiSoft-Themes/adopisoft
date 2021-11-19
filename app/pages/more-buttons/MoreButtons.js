define([
  'knockout',
  'core/rootVM',
  'core/services/config',
  'core/observables/customer'
], function(ko, rootVM, config, customer) {
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
});
