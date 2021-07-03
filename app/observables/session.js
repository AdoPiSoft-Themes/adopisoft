define([
  'knockout',
  'toast',
  'http',
  'redirect',
  'app/services/config',
  'app/utils/parseCredits',
  'app/utils/formatDate'
],
function (ko, toast, http, redirect, config, parseCredits, formatDate) {

  return function Session(data) {
    var self = this;
    self.type = data.type;
    self.data_mb = ko.observable(data.data_mb);
    self.data_consumption_mb = ko.observable(data.data_consumption_mb);
    self.remaining_time_seconds = ko.pureComputed(function () {
      return self.time_seconds() - self.running_time_seconds();
    });
    self.remaining_data_mb = ko.pureComputed(function () {
      return self.data_mb() - self.data_consumption_mb();
    });
    self.time_seconds = ko.observable(data.time_seconds);
    self.running_time_seconds = ko.observable(data.running_time_seconds);
    self.credits = ko.observable('');
    self.allow_pause = ko.observable(data.allow_pause);
    self.status = ko.observable(data.status);
    self.expiration_date = data.expiration_date;
    self.formatted_expiry_date = data.expiration_date
      ? formatDate(data.expiration_date)
      : 'N/A'; 
    self.startTick = function () {
      self.tick();
      self.interval = setInterval(self.tick, 1000);
    };
    self.tick = function () {
      if (self.status() === 'running' && self.isTimeSession() && self.remaining_time_seconds() > 0) {
        self.running_time_seconds(self.running_time_seconds() + 1);
      }
      self.credits(parseCredits(self));
    };
    self.stopTick = function () {
      clearInterval(self.interval);
    };
    self.isTimeSession = function () {
      return data.type.indexOf('time') > -1;
    }; 
    self.enablePause = ko.pureComputed(function () {
      return self.allow_pause() && self.status() === 'running';
    });
    self.showPauseBtn = ko.pureComputed(function () {
      return self.status() !== 'available';
    });
    self.showStartBtn = ko.pureComputed(function () {
      return self.status() !== 'running';
    });
    self.starting = ko.observable(false);
    self.startSession = function() {
      self.starting(true);
      http.startSession(data.id, function (err) {
        self.starting(false);
        if (err) {
          http.catchError(err);
        } else {
          self.status('running'); 
        }
      });
    };
    self.pausing = ko.observable(false);
    self.pauseSession = function() {
      self.pausing(true);
      http.pauseSession(data.id, function (err) {
        self.pausing(false);
        if (err) return http.catchError(err);
        self.status('available'); 
        redirect.cancel();
      });
    };
    self.startTick();
  };

});
