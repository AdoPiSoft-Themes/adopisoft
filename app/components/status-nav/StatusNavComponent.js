define([
  'knockout',
  'sessions',
  'app/services/config'
], function(ko, sessions, config) {

  function vm () {
    var self = this;
    var connectedIcon = config.findField('wifi_icons', 'wifi_connected_icon');
    var disconnectedIcon = config.findField('wifi_icons', 'wifi_disconnected_icon');
    this.connected = ko.pureComputed(function () {
      return sessions.hasRunning();
    });
    this.icon_src = ko.pureComputed(function() {
      return self.connected() ? connectedIcon : disconnectedIcon;
    });
    this.summary = ko.pureComputed(function () {
      return sessions.summary() || 'Disconnected';
    });
  }

  ko.components.register('status-nav', {
    viewModel: vm,
    template: {require: 'text!app/components/status-nav/status-nav.html'}
  });

});
