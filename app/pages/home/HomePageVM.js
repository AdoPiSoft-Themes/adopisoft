define([
  'knockout',
  'rootVM',
  'app/components/start-pause-buttons/StartPauseButtonsComponent',
  'app/components/buy-wifi-or-eload/BuyWifiOrEloadComponent',
  'app/components/voucher-form/VoucherForm',
  'app/components/device-info/DeviceInfo',
  'app/components/internet-status/InternetStatus',
  'app/components/mute-button/muteButton'
],
function (ko, rootVM) {
  function HomePageVM() {
    this.koDescendantsComplete = function() {
      rootVM.showingBanners(true);
      rootVM.showingSessionsTable(true);
      rootVM.showingStatusNav(true);
    };
  }
  return HomePageVM;
});
