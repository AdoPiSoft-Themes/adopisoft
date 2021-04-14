define([
  'knockout',
  'rootVM',
  'wifiRates',
  'app/utils/shortSecondsFormat',
  'app/utils/formatBytes',
  'app/utils/array.map'
], function(ko, rootVM, wifiRates, secondsFormat, formatBytes, map) {
  ko.components.register('view-rates', {
    viewModel: function () {
      var self = this;
      self.rates = ko.observableArray(map(wifiRates.rates(), function(r) {
        return {
          unitAmount: ko.pureComputed(function () {
            return wifiRates.currency() + ' ' + r.amount;
          }),
          credits: ko.pureComputed(function () {
            var s = secondsFormat(r.minutes * 60);
            var mb = formatBytes(r.data_mb);
            return s + '/' + mb;
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
