define(
  ['knockout', 'app/utils/parseCredits', 'app/utils/http', 'app/utils/config', 'app/utils/redirect', 'app/utils/formatDate'],
  function (ko, parseCredits, http, config, redirect, formatDate) {

    return function Session(data) {
      // ["id","type","max_users","status","remaining_time_seconds","remaining_data_mb","data_mb","time_seconds","data_consumption_mb","running_time_seconds","bandwidth_down_kbps","bandwidth_up_kbps","expiration_date","expire_minutes","allow_pause","pause_limit","use_global_bandwidth","is_free_trial","created_at","updated_at"]
      var self = this;
      this.type = data.type;
      this.data_mb = data.data_mb;
      this.data_consumption_mb = data.data_consumption_mb;
      this.expiration_date = data.expiration_date;
      this.remaining_time_seconds = data.remaining_time_seconds;
      this.credits = ko.observable(parseCredits(data));
      this.allow_pause = ko.observable(data.allow_pause);
      this.status = ko.observable(data.status);
      this.formatted_expiry_date = data.expiration_date
        ? formatDate(data.expiration_date)
        : 'N/A'; 
      this.startTick = function () {
        self.tick();
        self.interval = setInterval(self.tick, 1000);
      };
      this.tick = function () {
        if (self.status() === 'running') { 
          if (self.isTimeSession() && self.remaining_time_seconds > 0) self.remaining_time_seconds = self.remaining_time_seconds - 1;
          self.credits(parseCredits(self));
        }
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
          if (err) return alert(err);
          self.status('running'); 
          redirect.redirect(); 
        });
      };
      this.pauseSession = function () {
        http.post('/client/sessions/' + data.id + '/pause', function (err) {
          if (err) return alert(err);
          self.status('available'); 
          redirect.cancel();
        });
      };
      if (data.type.indexOf('time') > -1) self.startTick();

    };

  });
