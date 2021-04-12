define([
  'knockout',
  'toast',
  'app/observables/session',
  'app/utils/array.find',
  'app/utils/array.map',
  'app/utils/sessionSummary',
  'app/services/http'
], function(ko, toast, Session, find, map, sessionSummary, http) {

  var sessions = ko.observableArray([]);

  var util = {
    fetch: function() {
      http.fetchSessions(function(err, data) {
        if (err) return toast.error('Error fetching sessions list!');
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

  util.fetch();
  return util;

});
