define([
  'knockout',
  'app/observables/wifiRates',
  'app/observables/payment',
  'rootVM'
], function (ko, rates, payment, rootVM) {
  return function () {
    this.sampleText = ko.observable('txt-1');
    this.rates = rates;
    this.loading = ko.observable(false);
    this.koDescendantsComplete = function () {
      rootVM.showingStatusNav(true);
      rootVM.showingBanners(true);
      rootVM.showingSessionsTable(true);
    };
    this.selectRate = function (type) {
      this.loading(true);
      payment.rateType(type);
      rootVM.navigate('select-coinslot-page');
    };
  };
});
