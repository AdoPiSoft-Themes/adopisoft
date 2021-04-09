define([
  'knockout',
  'app/components/start-pause-buttons/StartPauseButtonsComponent'
], function(ko) {
  ko.components.register('buy-wifi-or-eload', {
    viewModel: {require: 'app/pages/buy-wifi-or-eload/BuyWifiOrEloadVM'},
    template: {require: 'text!app/pages/buy-wifi-or-eload/buy-wifi-or-eload.html'}
  });
});
