define([
  'knockout',
  'rootVM',
  'toast',
  'http',
  'app/observables/payment',
  'app/observables/device',
  'app/observables/customer',
  'modal',
  'app/components/wallet-prompt/WalletPrompt'
], function (ko, rootVM, toast, http, payment, device, customer, modal) {

  return function () {
    var self = this;

    self.selectedId = ko.observable('');
    self.loading = ko.observable(true);
    self.coinslots = ko.observableArray([]);
    self.koDescendantsComplete = function () {
      rootVM.showingStatusNav(true);
      rootVM.showingBanners(true);
      rootVM.showingSessionsTable(false);

      http.fetchCoinslots(function(err, coinslots) {
        if (err) return http.catchError(err);
        self.coinslots(coinslots);
        self.loading(false);

        var wifi_rates = ['time', 'data', 'time_or_data'];
        var is_wifi_rate = false;
        for (var x = 0; x < wifi_rates.length; x++) {
          if (wifi_rates[x] === payment.rateType()) is_wifi_rate = true;
        }
        if (is_wifi_rate && customer.credits() > 0) {
          modal.show('wallet-prompt', {customer: customer, rate_type: payment.rateType(), is_voucher: payment.isVoucher()});
        } else if (coinslots.length === 1) {
          self.selectCoinslot(coinslots[0].id);
        }
      });

    };
    self.selectCoinslot = function(coinslot_id) {
      self.selectedId(coinslot_id);
      self.loading(true);
      var params = {
        coinslot_id: coinslot_id,
        type: payment.rateType(),
        is_voucher: payment.isVoucher()
      };
      if(params.type === 'eload') {
        var opts = payment.eloadOptions();
        params.provider_id = opts.provider_id;
        params.account_number = opts.account_number;
        params.product_keyword = opts.product_keyword;
      }

      http.queForPayment(params, function(err) {
        if (err) {
          http.catchError(err);
          self.loading(false);
        } else {
          device.is_paying(true);
        }
      });
    };
  };

});
