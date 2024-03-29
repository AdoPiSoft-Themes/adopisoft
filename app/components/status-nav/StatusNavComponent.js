define([
  'knockout',
  'sessions',
  'translator',
  'app/services/config',
  'text!app/components/status-nav/status-nav.html'
], function(ko, sessions, translator, config, tpl) {

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
      return sessions.summary() || translator.print('DISCONNECTED');
    });
  }

  ko.components.register('status-nav', {
    viewModel: vm,
    template: tpl
  });

});
