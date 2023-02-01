define([
  'knockout',
  'app/components/device-info/DeviceInfo',
  'app/pages/buy-wifi-buttons/BuyWifiButtonsVM',
  'text!app/pages/buy-wifi-buttons/buy-wifi-buttons.html'
], function (ko, device, VM, tpl) {
  ko.components.register('buy-wifi-buttons', {
    viewModel: VM,
    template: tpl
  });
});
