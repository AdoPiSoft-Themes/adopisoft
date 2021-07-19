define([
  'knockout',
  'toast',
  'http',
  'app/observables/session',
  'app/utils/array.find',
  'app/utils/array.map',
  'app/utils/sessionSummary'
], function(ko, toast, http, Session, find, map, sessionSummary) {

  var sessions = ko.observableArray([]);

  var util = {
    fetch: function() {
      http.fetchSessions(function(err, data) {
        if (err) return http.catchError(err);
        util.stopSessionsTick();
        sessions(map(data, function (s) {
          return new Session(s);
        }));
        util._fetchTimeout = setTimeout(function() {
          util.fetch();
        }, 5000);
      });
    },
    get: function() {
      return sessions;
    },
    stopSessionsTick: function() {
      map(sessions(), function(s) {
        return s.stopTick();
      });
    },
    stopSync: function () {
      if (util._fetchTimeout) {
        clearTimeout(util._fetchTimeout);
        util._fetchTimeout = null;
      }
    },
    hasSessions: ko.pureComputed(function() {
      return sessions().length > 0;
    }),
    runningSession: ko.pureComputed(function() {
      return find(sessions(), function(s) {
        return s.status() === 'running';
      });
    }),
    hasRunning: ko.pureComputed(function() {
      return !!util.runningSession();
    }),
    available: ko.pureComputed(function() {
      return find(sessions(), function(s) {
        return s.status() === 'available';
      });
    }),
    summary: ko.pureComputed(function() {
      return sessionSummary(sessions());
    })
  };

  return util;

});
