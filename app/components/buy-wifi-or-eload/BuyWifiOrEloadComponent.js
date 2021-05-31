define([
  'knockout',
  'app/components/start-pause-buttons/StartPauseButtonsComponent',
  'app/components/device-info/DeviceInfo'
], function(ko) {
  ko.components.register('buy-wifi-or-eload', {
    viewModel: {require: 'app/components/buy-wifi-or-eload/BuyWifiOrEloadVM'},
    template: {require: 'text!app/components/buy-wifi-or-eload/buy-wifi-or-eload.html'}
  });
});
