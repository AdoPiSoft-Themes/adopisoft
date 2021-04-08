define(['knockout', 'app/observables/sessions', 'app/utils/sessionSummary'], function (ko, sessions, sessionSummary) {
  return function () {
    var self = this;
    this.sessions = sessions;
    this.summary = ko.pureComputed(function () {
      return sessionSummary(self.sessions());
    });
  };
});
