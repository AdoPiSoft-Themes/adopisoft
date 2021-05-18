define([
  'knockout',
  'rootVM',
  'app/components/start-pause-buttons/StartPauseButtonsComponent',
  'app/components/insert-coin-btn/InsertCoinBtn',
  'app/components/voucher-form/VoucherForm',
  'app/components/device-info/DeviceInfo',
  'app/components/internet-status/InternetStatus'
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
