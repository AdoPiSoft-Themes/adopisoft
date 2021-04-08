define(['knockout', 'app/utils/config'], function (ko, config) {
  return function () {
    var self = this;
    this.showInsertCoin = ko.observable(config.findField('buttons', 'button_insert_coin').value);
    this.showBuyVoucher = ko.observable(config.findField('buttons', 'button_buy_voucher').value);
    this.showViewVouchers = ko.observable(config.findField('buttons', 'button_view_vouchers').value);
    this.showViewRates = ko.observable(config.findField('buttons', 'button_view_rates').value);
    this.showingMore = ko.observable(false);
    this.showMoreBtn = ko.pureComputed(function () {
      return (self.showViewVouchers() || self.showViewRates()) && !self.showingMore();
    });
    this.toggleButtons = function () {
      self.showingMore(!self.showingMore());
    };
    this.buyWifi = function () {
      console.log(self.$parent);  
    };
    this.buyVoucher = function () {};
  };
});
