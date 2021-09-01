define([
  'knockout',
  'rootVM',
  'wifiRates',
  'app/utils'
], function(ko, rootVM, wifiRates, Utils) {
  return function () {
    var self = this;
    self.rates = ko.observableArray(Utils.array.map(wifiRates.rates(), function(r) {
      return {
        unitAmount: ko.pureComputed(function () {
          return wifiRates.currency() + ' ' + r.amount;
        }),
        timeRate: ko.pureComputed(function () {
          var t = wifiRates.time_or_data_rates() || wifiRates.time_rates();
          return t ? Utils.seconds.short(r.minutes * 60) : 'Unlimited';
        }),
        dataRate: ko.pureComputed(function () {
          var d = wifiRates.time_or_data_rates() || wifiRates.data_rates();
          return d ? Utils.formatBytes(r.data_mb) : 'Unlimited';
        })
      };
    }));
    self.koDescendantsComplete = function () {
      rootVM.showingStatusNav(true);
      rootVM.showingBanners(true);
      rootVM.showingSessionsTable(false);
    };

  };
});
