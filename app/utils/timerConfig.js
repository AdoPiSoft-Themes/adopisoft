define([
  'knockout',
  'app/services/http'
], function(ko, http) {
  var timerConfig = {
    wait_payment_seconds: ko.observable(100)
  };
  http.timerConfig(function (err, config) {
    timerConfig.wait_payment_seconds(config.wait_payment_seconds);
  });
  return timerConfig;
});
