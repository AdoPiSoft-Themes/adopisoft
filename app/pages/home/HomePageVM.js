define([
  'knockout',
  'rootVM',
  'http',
  'app/observables/payment',
  'app/utils/array.map',
  'app/components/start-pause-buttons/StartPauseButtonsComponent',
  'app/components/buy-wifi-or-eload/BuyWifiOrEloadComponent',
  'app/components/voucher-form/VoucherForm',
  'app/components/device-info/DeviceInfo',
  'app/components/internet-status/InternetStatus',
  'app/components/mute-unmute/MuteUnmute',
  'app/components/user-account/UserAccount',
  'app/components/chat-plugin/ChatPlugin',
  'app/components/charging-station/ChargingStation'
],
function (ko, rootVM, http, payment, map) {
  return function() {
    var self = this;
    
    self.loading = ko.observable(false);
    self.eloadLoading = ko.observable(false)
    self.vouchersLoading = ko.observable(false)
    self.showRatesLoading = ko.observable(false)
    self.gcashLoading = ko.observable(false)
    self.accountLoading = ko.observable(false)
    self.isChatPluginEnabled = ko.observable(false)
    self.hasChatPlugin = ko.observable(false)
    self.hasChargingPlugin = ko.observable(false)

    self.koDescendantsComplete = function() {
      rootVM.showingBanners(true);
      rootVM.showingSessionsTable(true);
      rootVM.showingStatusNav(true);

      http.getPluginConfigs(function (err, data) {
        if (err) {
          self.hasChatPlugin(false)
          self.hasChargingPlugin(false)
          return
        }
        map(data, function(d){
          if (d.name === 'chat-plugin' && !d.hide_portal_button) {
            self.hasChatPlugin(true)
          } else if (d.name === 'charging-station') {
            self.hasChargingPlugin(true)
          }
        })
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
