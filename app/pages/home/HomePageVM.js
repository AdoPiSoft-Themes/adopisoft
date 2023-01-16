define([
  'knockout',
  'rootVM',
  'http',
  'app/observables/payment',
  'app/components/start-pause-buttons/StartPauseButtonsComponent',
  'app/components/buy-wifi-or-eload/BuyWifiOrEloadComponent',
  'app/components/voucher-form/VoucherForm',
  'app/components/device-info/DeviceInfo',
  'app/components/internet-status/InternetStatus',
  'app/components/mute-unmute/MuteUnmute',
  'app/components/user-account/UserAccount'
],
function (ko, rootVM, http, payment) {
  return function() {
    var self = this;
    
    self.loading = ko.observable(false);
    self.eloadLoading = ko.observable(false)
    self.vouchersLoading = ko.observable(false)
    self.showRatesLoading = ko.observable(false)
    self.gcashLoading = ko.observable(false)
    self.accountLoading = ko.observable(false)
    self.isChatPluginEnabled = ko.observable(false)

    self.koDescendantsComplete = function() {
      rootVM.showingBanners(true);
      rootVM.showingSessionsTable(true);
      rootVM.showingStatusNav(true);
      http.findPluginByName('chat-plugin', function (err, data) {
        if (err) self.isChatPluginEnabled(false)
        self.isChatPluginEnabled(!data.hide_portal_button)

      })
    };

    self.buyWifi = function () {
      self.loading(true)
      payment.intent('wifi');
      payment.isVoucher(false);
      payment.rateType('');
      rootVM.navigate('buy-wifi-buttons');
    }

    self.buyEload = function () {
      self.eloadLoading(true)
      rootVM.navigate('buy-eload-page')
    }
    self.showVouchers = function () {
      self.vouchersLoading(true)
      rootVM.navigate('view-vouchers')
    }
    self.showRates = function () {
      self.showRatesLoading(true)
      rootVM.navigate('view-rates')
    }
    self.showAccount = function () {
      self.accountLoading(true)
      rootVM.navigate('view-account')
    }
    self.showGcash = function () {
      self.gcashLoading(true)
      rootVM.navigate('gcash-cashin')
    }
  }
});
