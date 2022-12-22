define([
  'knockout',
  'app/services/config',
  'app/pages/home/HomePageVM',
  'text!app/pages/home/home-page.html'
], function (ko, config, VM, tpl) {

  this.showViewRatesBtn = ko.observable(config.findField('buttons', 'button_view_rates'));
  this.showMoreBtn = ko.observable(config.findField('buttons', 'more_button'));
  this.showMyAccountBtn = ko.observable(config.findField('buttons', 'button_my_account'));
  this.showViewVouchersBtn = ko.observable(config.findField('buttons', 'button_view_vouchers'));
  this.showBuyVoucherBtn = ko.observable(config.findField('buttons', 'button_buy_voucher'));

  this.hasNoMoreButtons = ko.observable(!this.showMyAccountBtn() && !this.showViewVouchersBtn() && !this.showBuyVoucherBtn())

  ko.components.register('home-page', {
    viewModel: VM,
    template: tpl
  });
});
