define(['knockout', 'app/observables/sessions', 'app/utils/sessionSummary', 'app/utils/array.find'], function (ko, sessions, sessionSummary, find) {
  return function () {
    var self = this;
    this.sessions = sessions;
    this.summary = ko.pureComputed(function () {
      return find(self.sessions(), function (s) { 
        return s.type === 'time'; 
      }).remaining_time_seconds;
    });
  };
});
