define([
  'knockout',
  'app/observables/wifiRates',
  'app/observables/payment',
  'rootVM'
], function (ko, rates, payment, rootVM) {
  return function () {
    var self = this;
    this.sampleText = ko.observable('txt-1');
    this.rates = rates;
    this.loading = ko.observable(false);
    this.koDescendantsComplete = function () {
      rootVM.showingStatusNav(true);
      rootVM.showingBanners(true);
      rootVM.showingSessionsTable(true);
    };
    this.buyWifiTime = function () {
      this.loading(true);
      payment.rateType('time');
      //rootVM.navigate('select-coinslot-page');
      setTimeout(function () {
        self.loading(false);
        self.sampleText(Math.random());
      }, 2000);
    };
  };
});
