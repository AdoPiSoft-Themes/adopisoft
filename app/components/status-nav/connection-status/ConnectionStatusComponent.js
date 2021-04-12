define([
  'knockout',
  'app/services/sessions'
], function(ko, sessions) {
  ko.components.register('connection-status', {
    viewModel: function() {
      this.connected = ko.pureComputed(function () {
        return sessions.hasRunning();
      });
    },
    template: {require: 'text!app/components/status-nav/connection-status/connection-status.html'}
  });
});
