define([
  'knockout',
  'http',
  'wifiRates',
  'app/utils/shortSecondsFormat',
  'app/utils/array.map',
  'text!app/components/session-expirations/session-expirations.html'
], function (ko, http, wifiRates, secondsFormat, map, tpl) {
  ko.components.register('session-expirations', {
    viewModel: function() {
      var self = this;
      self.session_settings = ko.observableArray([])
      self.time_rates = ko.observable(wifiRates.time_rates())
      self.data_rates = ko.observable(wifiRates.data_rates())
      self.time_or_data_rates = ko.observable(wifiRates.time_or_data_rates())

      http.fetchSessionSettings(function(err, data) {
        if (err) return http.catchError(err);
        
        map(data, function (d) {
          d.minutes_from = secondsFormat(d.minutes_from * 60)
          d.minutes_to = secondsFormat(d.minutes_to * 60)

          if (d.expiration_minutes !== null){
            d.expiration_minutes = secondsFormat(d.expiration_minutes * 60)
          }

          if (self.time_rates() && d.rate_type === 'time') {
            self.session_settings.push(d)
          } else if (self.data_rates() && d.rate_type === 'data' ) {
            self.session_settings.push(d)
          } else if(self.time_or_data_rates() && d.rate_type === 'time_or_data'){
            self.session_settings.push(d)
          }

        })

      })  
    },
    template: tpl
  })
})