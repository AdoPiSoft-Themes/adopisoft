define([
  'knockout',
  'sessions',
  'app/observables/device',
  'translator',
  'app/services/config',
  'text!app/components/status-nav/status-nav.html'
], function(ko, sessions, device, translator, config, tpl) {

  function vm () {
    var self = this;
    self.isDeviceReady = device.is_ready
    var connectedIcon = config.findField('wifi_icons', 'wifi_connected_icon');
    var disconnectedIcon = config.findField('wifi_icons', 'wifi_disconnected_icon');
    
    this.hasSessions = ko.pureComputed(function () {
      return sessions.hasSessions()
    })

    this.connected = ko.pureComputed(function () {
      return sessions.hasRunning();
    });
    this.icon_src = ko.pureComputed(function() {
      return self.connected() ? connectedIcon : disconnectedIcon;
    });
    this.summary = ko.pureComputed(function () {
      return sessions.summary() || translator.print('DISCONNECTED');
    });
    this.focusSessions = function () {
      $('#sessions-list-con').focus()
    }
  }

  ko.components.register('status-nav', {
    viewModel: vm,
    template: tpl
  });

});
