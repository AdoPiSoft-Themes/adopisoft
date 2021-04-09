define([
  'knockout',
  'app/utils/config',
  'app/observables/sessions',
  'app/utils/array.find',
  'app/observables/wifiRates',
], function (ko, config, sessions, find, wifiRates) {
  return function () {
    var self = this;
    this.wifiRates = wifiRates;
    this.showInsertCoin = ko.observable(config.findField('buttons', 'button_insert_coin').value);
    this.showBuyVoucher = ko.observable(config.findField('buttons', 'button_buy_voucher').value);
    this.showBuyEload = true;
    this.showViewVouchers = ko.observable(config.findField('buttons', 'button_view_vouchers').value);
    this.showViewRates = ko.observable(config.findField('buttons', 'button_view_rates').value);
    this.showingMore = ko.observable(false);
    this.showingBuyBtns = ko.observable(false);
    this.showingBuyWifiBtns = ko.observable(false);
    this.showingSelectRate = ko.observable(false);
    this.showMoreBtn = ko.pureComputed(function () {
      return (self.showViewVouchers() || self.showViewRates()) && !self.showingMore();
    });
    this.toggleBuyButtons = function () {
      self.showingBuyBtns(!self.showingBuyBtns());
    };
    this.toggleBuyWifiBtns = function () {
      self.showingBuyWifiBtns(!self.showingBuyWifiBtns());
    };
    this.hasSessions = ko.pureComputed(function () {
      return sessions().length > 0; 
    });
    this.hasRunningSession = ko.pureComputed(function () {
      return find(sessions(), function (s) {
        return s.status() === 'running';
      });
    });
    this.pauseSession = function () {
      var running = find(sessions(), function (s) {
        return s.status() === 'running';
      });
      running.pauseSession();
    };
    this.startSession = function () {
      var available = find(sessions(), function (s) {
        return s.status() === 'available';
      });
      available.startSession();
    };
    this.allowPause = ko.pureComputed(function () {
      var s = self.hasRunningSession();
      return s && s.allow_pause();
    });

  };
});
