define([
  'knockout',
  'app/components/device-info/DeviceInfo'
], function (ko) {
  ko.components.register('buy-wifi-buttons', {
    viewModel: {require: 'app/pages/buy-wifi-buttons/BuyWifiButtonsVM'},
    template: {require: 'text!app/pages/buy-wifi-buttons/buy-wifi-buttons.html'}
  });
});
