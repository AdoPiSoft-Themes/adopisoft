define([
  'knockout',
  'app/observables/wifiRates',
  'app/observables/payment',
  'rootVM',
], function (ko, rates, payment, rootVM) {
  return function () {
    this.rates = rates;
    this.koDescendantsComplete = function () {
      rootVM.showingStatusNav(true);
      rootVM.showingBanners(true);
      rootVM.showingSessionsTable(true);
    };
    this.buyWifiTime = function () {
      payment.rateType('time');
      rootVM.navigate('select-coinslot-page');
    };
  };
});


