define([
  'knockout',
  'rootVM',
  'wifiRates',
  'app/observables/payment'
], function (ko, rootVM, rates, payment) {
  return function () {
    var self = this;
    self.sampleText = ko.observable('txt-1');
    self.rates = rates;
    self.loading = ko.observable(false);
    self.koDescendantsComplete = function () {
      rootVM.showingStatusNav(true);
      rootVM.showingBanners(true);
      rootVM.showingSessionsTable(true);

      if (!rates.time_or_data_rates()) {
        if (rates.time_rates() && !rates.data_rates()) self.selectRate('time');
        if (!rates.time_rates() && rates.data_rates()) self.selectRate('data');
      } else {
        self.selectRate('time_or_data');
      }

    };
    self.selectRate = function (type) {
      self.loading(true);
      payment.rateType(type);
      rootVM.navigate('select-coinslot-page');
    };

  };
});
