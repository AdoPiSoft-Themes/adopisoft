define([
  'knockout',
  'app/observables/device'
], function(ko, device) {
  ko.components.register('device-info', {
    viewModel: function() {
      this.device = device;
    },
    template: {require: 'text!app/components/device-info/device-info.html'}
  });
});
