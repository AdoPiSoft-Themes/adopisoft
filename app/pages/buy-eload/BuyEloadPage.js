define([
  'knockout',
  'rootVM',
  'toast',
  'http',
  'app/observables/payment',
  'app/components/eload-customer-recent/EloadCustomerRecent',
  'app/components/eload-providers/EloadProviders',
  'app/components/eload-products/EloadProducts',
  'app/components/eload-to-pay/EloadToPay'
], function (ko, rootVM, toast, http, payment) {

  ko.components.register('buy-eload-page', {
    viewModel: function () {
      var self = this;
      var cachedData = payment.eloadOptions();
      self.isPageReady = ko.observable(false);
      self.isEloadAvailable = ko.observable(true);
      self.showInstructionTxt = ko.observable(true);
      self.active_provider = ko.observable();
      self.isValidPhoneAcc = ko.observable(false);
      self.providers = ko.observableArray([]);

      self.acc_number = ko.observable('');
      self.customer = ko.observable();
      self.selected_product = ko.observable();
      self.voucher = ko.observable();
      self.last_purchase = ko.observable();
      self.loadingCustomer = ko.observable(false);
      self.loadingProviders = ko.observable(false);

      self.acc_number.subscribe(function(acc_number) {
        self.providers([]);
        self.active_provider(null);
        self.customer(null);
        self.last_purchase(null);

        var is_valid = acc_number.length > 5 && !isNaN(acc_number);
        self.isValidPhoneAcc(is_valid);
        self.showInstructionTxt(!is_valid);
        if (!is_valid) {
          return false;
        }

        self.loadingCustomer(true);
        http.getEloadClientData(acc_number, function(err, data) {
          self.customer(null);
          self.loadingCustomer(false);
          if (err) return http.catchError(err);

          if(data.customer && data.customer.id) {
            self.customer(data.customer);
            self.last_purchase(data.last_purchase);
          }

        });

        self.loadingProviders(true);
        http.getEloadProviders(acc_number, function(err, data) {
          self.active_provider(null);
          if (err) return http.catchError(err);

          self.loadingProviders(false);
          var providers = data || [];
          self.active_provider(providers[0]);
          self.providers(providers);
        });

      });

      self.koDescendantsComplete = function () {
        rootVM.showingStatusNav(false);
        rootVM.showingBanners(false);
        rootVM.showingSessionsTable(false);

        self.acc_number(cachedData.account_number || ''); //pre-populate cached number

        http.checkEloadAvailability(function(err, data) {
          self.isPageReady(true);
          if (err) {
            self.isEloadAvailable(false);
            return http.catchError(err);
          }
          self.isEloadAvailable(data.is_available);
        });

      };
    },
    template: {require: 'text!app/pages/buy-eload/buy-eload-page.html'}
  });

});
