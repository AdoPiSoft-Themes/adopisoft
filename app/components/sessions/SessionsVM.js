define(['knockout', 'app/utils/array.find'], function (ko, find) {
  function MyViewModel() {
    var self = this;
    this.sessions = ko.observableArray([]);
    this.stopSessionsTick = function () {
      var sessions = this.sessions();
      for (var i = 0; i < sessions.length; i++) {
        var s = sessions[i];
        s.stopTick();
      }
    };
    this.hasSessions = ko.pureComputed(function () {
      return self.sessions().length > 0;
    });
    this.pauseSession = function () {
      var running = find(this.sessions(), function (s) {
        return s.status() === 'running';
      });
      running.pauseSession();
    };
    this.startSession = function () {
      var available = find(this.sessions(), function (s) {
        return s.status() === 'available';
      });
      available.startSession();
    };
    this.hasRunningSession = ko.pureComputed(function () {
      var s = find(self.sessions(), function (s) {
        return s.status() === 'running';
      });
      return s;
    });
  }
  return MyViewModel;
});
