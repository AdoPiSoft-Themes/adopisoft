define([
  'knockout',
  'app/components/buy-wifi-or-eload/BuyWifiOrEloadVM',
  'text!app/components/buy-wifi-or-eload/buy-wifi-or-eload.html',
  'app/components/start-pause-buttons/StartPauseButtonsComponent',
  'app/components/device-info/DeviceInfo'
], function(ko, VM, tpl) {
  ko.components.register('buy-wifi-or-eload', {
    viewModel: VM,
    template: tpl
  });
});
