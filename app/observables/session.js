define(['knockout', 'app/utils/parseCredits', 'app/utils/http'], function (ko, parseCredits, http) {

  return function Session(data) {
    Object.assign(this, data); 

    var self = this;
    this.credits = ko.observable(parseCredits(data));
    this.allow_pause = ko.observable(data.allow_pause);
    this.status = ko.observable(data.status);
    
    this.startTick = function () {
      if (self.status() === 'running') {
        self.tick();
        self.interval = setInterval(self.tick, 1000);
      }
    };
    this.tick = function () {
      if (self.remaining_time_seconds > 0) self.remaining_time_seconds = self.remaining_time_seconds - 1;
      self.credits(parseCredits(self));
    };
    this.stopTick = function () {
      clearInterval(self.interval);
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
      });
    };
    this.pauseSession = function () {
      http.post('/client/sessions/' + data.id + '/pause', function (err) {
        if (err) return alert(err);
        self.status('available'); 
      });
    };
    if (data.type.indexOf('time') > -1) self.startTick();

  };

});
