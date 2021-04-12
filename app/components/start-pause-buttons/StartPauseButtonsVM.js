define([
  'knockout',
  'app/services/sessions'
], function(ko, sessions) {

  return function() {
    this.sessions = sessions;
    this.pauseSession = function () {
      var running = sessions.runningSession();
      running.pauseSession();
    };
    this.startSession = function () {
      var available = sessions.available();
      available.startSession();
    };
    this.allowPause = ko.pureComputed(function () {
      var s = sessions.runningSession();
      return s && s.allow_pause();
    });
  };

});
