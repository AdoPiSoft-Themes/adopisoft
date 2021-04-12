define([
  'knockout',
  'rootVM',
  'toast',
  'app/observables/payment',
  'app/observables/device',
  'app/services/http'
], function (ko, rootVM, toast, payment, device, http) {

  return function () {
    var self = this;
    rootVM.showingStatusNav(true);
    rootVM.showingBanners(true);
    rootVM.showingSessionsTable(false);
    this.coinslots = ko.observableArray([]);
    this.koDescendantsComplete = function () {
      rootVM.showingStatusNav(true);
      rootVM.showingBanners(true);
      rootVM.showingSessionsTable(false);

      http.fetchCoinslots(function(err, coinslots) {
        if (err) return toast.error(err.toString());
        self.coinslots(coinslots);
      });
    };
    this.selectCoinslot = function(coinslot_id) {
      http.queForPayment({
        coinslot_id: coinslot_id,
        type: payment.rateType(),
        is_voucher: payment.isVoucher()
      }, function(err) {
        if (err) http.catchError(err);
        if (!err) {
          device.is_paying(true);
        }
      });
    };
  };

});
