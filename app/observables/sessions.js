define([
  'knockout',
  'toast',
  'app/observables/session',
  'app/utils/array.map',
  'app/utils/http'
], function (ko, toast, Session, map, http) {

  var sessions = ko.observableArray([]);

  function featchSessions() {
    http.fetchSessions(function(err, data) {
      if (err) return toast.error('Error fetching sessions list!');
      stopSessionsTick();
      sessions(map(data, function (s) {
        return new Session(s);
      }));
    });
  }

  function stopSessionsTick() {
    map(sessions(), function(s) {
      return s.stopTick();
    });
  }

  featchSessions();
  setInterval(featchSessions, 10000);

  return sessions;

});
