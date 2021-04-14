define([
  'knockout',
  'sessions'
], function(ko, sessions) {

  return function() {
    var self = this;
    self.starting = ko.observable(false);
    self.pausing = ko.observable(false);
    self.sessions = sessions;
    self.pauseSession = function () {
      var running = sessions.runningSession();
      self.setPausing();
      running.pauseSession();
    };
    self.startSession = function () {
      var available = sessions.available();
      self.setStarting();
      available.startSession();
    };
    self.allowPause = ko.pureComputed(function () {
      var s = sessions.runningSession();
      return s && s.allow_pause() && !self.pausing();
    });
    self.setStarting = function () {
      self.clearStarting();
      self.starting(true);
      self._startTimeout = setTimeout(function() {
        self.starting(false);
      }, 1000);
    };
    self.clearStarting = function() {
      if(self._startTimeout) clearTimeout(self._startTimeout);
      self._startTimeout = null;
    };
    self.setPausing = function () {
      self.clearPausing();
      self.pausing(true);
      self._pauseTimeout = setTimeout(function() {
        self.pausing(false);
      }, 1000);
    };
    self.clearPausing = function() {
      if(self._pauseTimeout) clearTimeout(self._pauseTimeout);
      self._pauseTimeout = null;
    };
    self.dispose = function () {
      self.clearStarting();
      self.clearPausing();
    };
  };

});
