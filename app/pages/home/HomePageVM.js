define([
  'knockout',
  'rootVM',
  'app/components/banner-text/BannerTextComponent',
  'app/components/start-pause-buttons/StartPauseButtonsComponent',
  'app/components/insert-coin-btn/InsertCoinBtn',
  'app/components/voucher-form/VoucherForm',
  'app/components/device-info/DeviceInfo'
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
