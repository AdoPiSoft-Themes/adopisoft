define([
  'knockout',
  'app/observables/device',
  'text!app/components/device-info/device-info.html'
], function(ko, device, html) {
  ko.components.register('device-info', {
    viewModel: function() {
      this.device = device;
    },
    template: html
  });
});
