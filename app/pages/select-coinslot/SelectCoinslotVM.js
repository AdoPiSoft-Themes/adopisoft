define([
  'knockout',
  'rootVM',
  'toast',
  'http',
  'app/observables/payment',
  'app/observables/device'
], function (ko, rootVM, toast, http, payment, device) {

  return function () {
    var self = this;
    rootVM.showingStatusNav(true);
    rootVM.showingBanners(true);
    rootVM.showingSessionsTable(false);
    self.selectedId = ko.observable('');
    self.loading = ko.observable(true);
    self.coinslots = ko.observableArray([]);
    self.koDescendantsComplete = function () {
      rootVM.showingStatusNav(true);
      rootVM.showingBanners(true);
      rootVM.showingSessionsTable(false);

      http.fetchCoinslots(function(err, coinslots) {
        if (err) return toast.error(err.toString());
        self.coinslots(coinslots);
        self.loading(false);
        if (coinslots.length === 1) self.selectCoinslot(coinslots[0].id);
      });

    };
    self.selectCoinslot = function(coinslot_id) {
      self.selectedId(coinslot_id);
      self.loading(true);
      var params = {
        coinslot_id: coinslot_id,
        type: payment.rateType(),
        is_voucher: payment.isVoucher()
      }
      if(params.type == 'eload'){
        var opts = payment.eloadOptions()
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
