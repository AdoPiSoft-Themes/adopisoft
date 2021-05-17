define([
  'knockout',
  'sessions'
], function (ko, sessionsUtil) {
  ko.components.register('session-summary', {
    viewModel: function () {
      this.summary = ko.pureComputed(function () {
        return sessionsUtil.summary() || 'Disconnected';
      });
    },
    template: {require: 'text!app/components/status-nav/session-summary/session-summary.html'}
  });
});

