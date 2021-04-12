define([
  'knockout',
  'app/components/banner-text/BannerTextComponent',
  'app/components/start-pause-buttons/StartPauseButtonsComponent',
  'app/components/insert-coin-btn/InsertCoinBtn',
  'app/components/device-info/DeviceInfo'
], function (ko) {
  ko.components.register('home-page', {
    viewModel: { require: 'app/pages/home/HomePageVM' },
    template: { require: 'text!app/pages/home/home-page.html' }
  });
});
