define([
  'knockout',
  'http'
], function(ko, http) {

  var wifiRates = {
    coinslotId: ko.observable(''),
    profileId: ko.observable(''),
    currency: ko.observable(''),
    data_rates: ko.observable(false),
    time_or_data_rates: ko.observable(false),
    time_rates: ko.observable(false),
    rates: ko.observableArray([]),
    update: function (cb) {
      return http.fetchRates(wifiRates.coinslotId(), function(err, data) {
        if (err) return http.catchError(err);
        wifiRates.profileId(data.id);
        wifiRates.currency(data.currency);
        wifiRates.data_rates(data.data_rates);
        wifiRates.time_or_data_rates(data.time_or_data_rates);
        wifiRates.time_rates(data.time_rates);
        wifiRates.rates(data.rates);
        if (typeof cb === 'function') {
          cb(wifiRates)
        }
      });
    },
    updateCoinslot: function (id, cb) {
      wifiRates.coinslotId(id)
      return wifiRates.update(cb)
    }
  };

  wifiRates.update()

  return wifiRates;

});
