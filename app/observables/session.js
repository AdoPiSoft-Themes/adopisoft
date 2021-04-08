define(
  ['knockout', 'toast', 'app/utils/sounds', 'app/utils/parseCredits', 'app/utils/http', 'app/utils/config', 'app/utils/redirect', 'app/utils/formatDate'],
  function (ko, toast, sounds, parseCredits, http, config, redirect, formatDate) {

    return function Session(data) {
      var self = this;
      this.type = data.type;
      this.data_mb = ko.observable(data.data_mb);
      this.data_consumption_mb = ko.observable(data.data_consumption_mb);
      this.remaining_time_seconds = ko.pureComputed(function () {
        return self.time_seconds() - self.running_time_seconds();
      });
      this.remaining_data_mb = ko.pureComputed(function () {
        return self.data_mb() - self.data_consumption_mb();
      });
      this.time_seconds = ko.observable(data.time_seconds);
      this.running_time_seconds = ko.observable(data.running_time_seconds);
      this.credits = ko.observable('');
      this.allow_pause = ko.observable(data.allow_pause);
      this.status = ko.observable(data.status);
      this.expiration_date = data.expiration_date;
      this.formatted_expiry_date = data.expiration_date
        ? formatDate(data.expiration_date)
        : 'N/A'; 
      this.startTick = function () {
        self.tick();
        self.interval = setInterval(self.tick, 1000);
      };
      this.tick = function () {
        if (self.status() === 'running' && self.isTimeSession() && self.remaining_time_seconds() > 0) {
          self.running_time_seconds(self.running_time_seconds() + 1);
        }
        self.credits(parseCredits(self));
      };
      this.stopTick = function () {
        clearInterval(self.interval);
      };
      this.isTimeSession = function () {
        return data.type.indexOf('time') > -1;
      }; 
      this.enablePause = ko.pureComputed(function () {
        return self.allow_pause() && self.status() === 'running';
      });
      this.showPauseBtn = ko.pureComputed(function () {
        return self.status() !== 'available';
      });
      this.showStartBtn = ko.pureComputed(function () {
        return self.status() !== 'running';
      });
      this.startSession = function () {
        http.post('/client/sessions/' + data.id + '/start', function (err) {
          if (err) {
            toast.error(err.toString());
          } else {
            sounds.connected.play();
            toast.success('Yehey! You are now connected to internet.');
            self.status('running'); 
            redirect.redirect(); 
          }
        });
      };
      this.pauseSession = function () {
        http.post('/client/sessions/' + data.id + '/pause', function (err) {
          if (err) {
            toast.error(err.toString());
          } else {
            sounds.disconnected.play();
            self.status('available'); 
            redirect.cancel();
            toast.error('Opps! Disconnected from internet.');
          }
        });
      };
      self.startTick();
    };

  });
