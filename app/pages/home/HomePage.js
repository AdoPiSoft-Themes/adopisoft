define([
  'knockout',
  'app/services/config',
  'app/pages/home/HomePageVM',
  'text!app/pages/home/home-page.html'
], function (ko, config, VM, tpl) {

  this.showViewInsertCoinBtn = ko.observable(config.findField('buttons', 'button_insert_coin'));
  this.showViewRatesBtn = ko.observable(config.findField('buttons', 'button_view_rates'));
  this.showBuyEloadBtn = ko.observable(config.findField('buttons', 'button_buy_eload'));
  this.showGcashBtn = ko.observable(config.findField('buttons', 'button_gcash'));
  this.showUnmuteBtn = ko.observable(config.findField('buttons', 'button_unmute'));
  this.showBuyVoucherBtn = ko.observable(config.findField('buttons', 'button_buy_voucher'));
  this.showVouchersBtn = ko.observable(config.findField('buttons', 'button_vouchers'));
  this.showAccountBtn = ko.observable(config.findField('buttons', 'button_my_account'));
  this.showChatBtn = ko.observable(config.findField('buttons', 'button_chat'))
  this.showChargingBtn= ko.observable(config.findField('buttons', 'button_charging'))

  ko.components.register('home-page', {
    viewModel: VM,
    template: tpl
  });
});
