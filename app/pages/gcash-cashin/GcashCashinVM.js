define([
  'knockout',
  'rootVM',
  'http',
  'app/observables/payment',
  'app/utils/array.find',
  'app/components/eload-customer-recent/EloadCustomerRecent',
  'app/components/eload-providers/EloadProviders',
  'app/components/eload-products/EloadProducts',
  'app/components/eload-to-pay/EloadToPay'
], function(ko, rootVM, http, payment, find) {
  return function () {
    var self = this

    var cachedData = payment.eloadOptions()
    self.isPageReady = ko.observable(false)
    self.isGcashAvailable = ko.observable(true)
    self.gcashProvider = ko.observable()
    self.hasError = ko.observable(false)
    self.isValid = ko.observable(false)
    self.acc_number = ko.observable('')
    self.customer = ko.observable()
    self.selected_product = ko.observable()
    self.voucher = ko.observable()
    self.last_purchase = ko.observable()
    self.phoneChecking = ko.observable(false)
    self.oldGcash = ko.observable()

    self.acc_number.subscribe(function(acc_number) {
      self.isValid(false)
      self.reset()

      var is_valid = acc_number.length >= 10 && !isNaN(acc_number)
      self.isValid(is_valid)

    })

    self.proccedClick = function () {
      self.phoneChecking(true)
      http.getEloadProviders(self.acc_number(), function (err, data) {
        self.phoneChecking(false)
        self.gcashProvider(null);
        if (err) return http.catchError(err)
        
        http.getEloadClientData(self.acc_number(), function(err, data) {
          self.customer(null);
          if (err) return http.catchError(err);
          if(data.customer && data.customer.id) {
            self.customer(data.customer);
            if (data.last_purchase && data.last_purchase.provider_id === self.oldGcash().id) {
              self.last_purchase(data.last_purchase);
            }
          }

        });

        var providers = data || []
        var gcash = (find(providers, function(provider){
          return provider.name.match(/^gcash/i)
        })) || null

        self.gcashProvider(gcash)
        if (!gcash) {
          self.hasError(true)
        }
      })
    }

    self.reset = function () {
      self.gcashProvider(null)
      self.customer(null)
      self.last_purchase(null)
      self.hasError(false)
    }

    self.koDescendantsComplete = function () {
      rootVM.showingStatusNav(false);
      rootVM.showingBanners(false);
      rootVM.showingSessionsTable(false);
      self.acc_number(cachedData.account_number || ''); //pre-populate cached number

      http.checkEloadAvailability(function(err, data) {
        if (err) { 
          self.isPageReady(true)
          self.isGcashAvailable(false) 
          return http.catchError(err);
        }

        if (!data.is_available) {
          self.isPageReady(true)
          self.isGcashAvailable(false)
          return
        }

        http.checkProviderByShortName('gcash cash-in', function (err, data2) {
          self.isPageReady(true)
          if (err) {
            self.isGcashAvailable(false)
            return http.catchError(err)
          }
          self.isGcashAvailable(data2.is_available)
          self.oldGcash(data2.provider)
        })
      })

    }

  }
})