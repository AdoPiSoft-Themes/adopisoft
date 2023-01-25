define([
  'knockout',
  'rootVM',
  'wifiRates',
  'app/observables/payment',
  'http',
  'modal',
  'app/observables/device',
  'app/observables/customer'
], function (ko, rootVM, rates, payment, http, modal, device, customer) {
  return function () {
    var self = this;
    self.rates = rates
    self.loading = ko.observable(false);
    var coinslot_id = payment.coinslotId()
    self.koDescendantsComplete = function () {
      rootVM.showingStatusNav(true);
      rootVM.showingBanners(true);
      rootVM.showingSessionsTable(true);

      rates.updateCoinslot(coinslot_id, function () {
        if (!rates.time_or_data_rates()) {
          if (rates.time_rates() && !rates.data_rates()) self.selectRate('time');
          if (!rates.time_rates() && rates.data_rates()) self.selectRate('data');
        } else {
          self.selectRate('time_or_data');
        }
      })
    };

    self.selectRate = function (type) {
      function quePayment () {
        self.loading(true);
        payment.rateType(type);
        
        var params = {
          type: type,
          coinslot_id: coinslot_id,
          rates_profile_id: rates.profileId(),
          is_voucher: payment.isVoucher()
        };
        
        http.queForPayment(params, function(err) {
          if (err) {
            http.catchError(err);
            self.loading(false);
          } else {
            device.is_paying(true);
          }
        });
      }

      if (customer.credits() > 0) {
        modal.show('wallet-prompt', {
          customer: customer,
          rate_type: type,
          is_voucher: payment.isVoucher(),
          onClose: function (amount_paid) {
            if (parseInt(amount_paid) > 0) return
            quePayment()
          }
        });
      } else {
        quePayment()
      }
        
    };

  };
});
