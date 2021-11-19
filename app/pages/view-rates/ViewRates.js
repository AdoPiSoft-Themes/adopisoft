define([
  'knockout',
  'core/rootVM',
  'app/services/wifiRates',
  'core/utils/shortSecondsFormat',
  'core/utils/formatBytes',
  'core/utils/array/map'
], function(ko, rootVM, wifiRates, secondsFormat, formatBytes, map) {
  ko.components.register('view-rates', {
    viewModel: function () {
      var self = this;
      self.rates = ko.observableArray(map(wifiRates.rates(), function(r) {
        return {
          unitAmount: ko.pureComputed(function () {
            return wifiRates.currency() + ' ' + r.amount;
          }),
          timeRate: ko.pureComputed(function () {
            var t = wifiRates.time_or_data_rates() || wifiRates.time_rates();
            return t ? secondsFormat(r.minutes * 60) : 'Unlimited';
          }),
          dataRate: ko.pureComputed(function () {
            var d = wifiRates.time_or_data_rates() || wifiRates.data_rates();
            return d ? formatBytes(r.data_mb) : 'Unlimited';
          })
        };
      }));
      self.koDescendantsComplete = function () {
        rootVM.showingStatusNav(true);
        rootVM.showingBanners(true);
        rootVM.showingSessionsTable(false);
      };
    },
    template: {require: 'text!app/pages/view-rates/view-rates.html'}
  });
});
