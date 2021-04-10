define([
  'knockout',
  'app/observables/sessions',
  'app/utils/array.find'
], function(ko, sessions, find) {

  return function() {
    var self = this;
    this.hasSessions = ko.pureComputed(function () {
      return sessions().length > 0; 
    });
    this.hasRunningSession = ko.pureComputed(function () {
      return find(sessions(), function (s) {
        return s.status() === 'running';
      });
    });
    this.pauseSession = function () {
      var running = find(sessions(), function (s) {
        return s.status() === 'running';
      });
      running.pauseSession();
    };
    this.startSession = function () {
      var available = find(sessions(), function (s) {
        return s.status() === 'available';
      });
      available.startSession();
    };
    this.allowPause = ko.pureComputed(function () {
      var s = self.hasRunningSession();
      return s && s.allow_pause();
    });
  };

});
