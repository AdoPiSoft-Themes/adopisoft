define([
  'knockout',
  'rootVM',
  'http',
  'wifiRates',
  'app/utils/shortSecondsFormat',
  'app/utils/formatBytes',
  'app/utils/array.map',
  'app/utils/array.find'
], function(ko, rootVM, http, wifiRates, secondsFormat, formatBytes, map, find) {
  ko.components.register('view-rates', {
    viewModel: function () {
      var self = this;
      self.selectedCoinslot = ko.observable('')
      self.coinslots = ko.observableArray([]);
      self.rates = ko.observableArray([]);

      function updateRates () {
        self.rates(map(wifiRates.rates(), function(r) {
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
        }))
      }

      http.fetchCoinslots('wifi', function(err, coinslots) {
        if (err) return http.catchError(err);

        self.coinslots(coinslots)
        let coinslot_id = (coinslots[0] || {}).id

        if (coinslot_id) {
          self.selectedCoinslot(coinslot_id);
        }
        wifiRates.updateCoinslot(coinslot_id, updateRates)
      });

      self.selectedCoinslot.subscribe(function(id) {
        wifiRates.updateCoinslot(id, updateRates)
      })

      self.koDescendantsComplete = function () {
        rootVM.showingStatusNav(true);
        rootVM.showingBanners(true);
        rootVM.showingSessionsTable(false);
      };
    },
    template: {require: 'text!app/pages/view-rates/view-rates.html'}
  });
});
