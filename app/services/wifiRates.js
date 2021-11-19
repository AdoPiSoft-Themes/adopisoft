define([
  'knockout',
  'app/services/http'
], function(ko, http) {

  var wifiRates = {
    currency: ko.observable(''),
    data_rates: ko.observable(false),
    time_or_data_rates: ko.observable(false),
    time_rates: ko.observable(false),
    rates: ko.observableArray([])
  };

  http.fetchRates(function(err, data) {
    if (err) return http.catchError(err);
    wifiRates.currency(data.currency);
    wifiRates.data_rates(data.data_rates);
    wifiRates.time_or_data_rates(data.time_or_data_rates);
    wifiRates.time_rates(data.time_rates);
    wifiRates.rates(data.rates);
  });

  return wifiRates;

});
