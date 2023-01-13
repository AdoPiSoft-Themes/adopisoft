define([
  'knockout',
  'app/services/config'
], function (ko, config) {

  this.showViewInsertCoinBtn = ko.observable(config.findField('buttons', 'button_insert_coin'));
  this.showViewRatesBtn = ko.observable(config.findField('buttons', 'button_view_rates'));
  this.showBuyEloadBtn = ko.observable(config.findField('buttons', 'button_buy_eload'));
  this.showGcashBtn = ko.observable(config.findField('buttons', 'button_gcash'));
  this.showUnmuteBtn = ko.observable(config.findField('buttons', 'button_unmute'));
  this.showBuyVoucherBtn = ko.observable(config.findField('buttons', 'button_buy_voucher'));
  this.showVouchersBtn = ko.observable(config.findField('buttons', 'button_vouchers'));
  this.showAccountBtn = ko.observable(config.findField('buttons', 'button_account'));

  ko.components.register('home-page', {
    viewModel: { require: 'app/pages/home/HomePageVM' },
    template: { require: 'text!app/pages/home/home-page.html' }
  });
});
