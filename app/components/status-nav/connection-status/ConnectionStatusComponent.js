define([
  'knockout',
  'sessions',
  'app/services/config'
], function(ko, sessions, config) {
  ko.components.register('connection-status', {
    viewModel: function() {
      this.connectedIcon = config.findField('wifi_icons', 'wifi_connected_icon');
      this.disconnectedIcon = config.findField('wifi_icons', 'wifi_disconnected_icon');
      this.connected = ko.pureComputed(function () {
        return sessions.hasRunning();
      });
    },
    template: {require: 'text!app/components/status-nav/connection-status/connection-status.html'}
  });
});
