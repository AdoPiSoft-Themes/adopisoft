define([
  'knockout',
  'rootVM',
  'app/services/config',
  'app/observables/payment',
  'app/components/toast/ToastComponent',
  'app/components/status-nav/StatusNavComponent',
  'app/components/banners/Banners',
  'app/components/sessions-table/SessionsTableComponent'
], function (ko, rootVM, config, payment) {

  return function AppVM() {
    this.favicon = ko.observable(config.favicon());
    this.pageTitle = ko.observable(config.pageTitle());
    this.styles = ko.observableArray(config.styles());
    this.footerHtml = ko.observable(config.footerHtml());
    
    this.buyWifi = function () {
      payment.intent('wifi');
      this.navigate('select-coinslot-page');
    };
    this.buyVoucher = function () {
      this.intent('buy_voucher');
      this.navigate('select-coinslot-page');
    };
    rootVM.page('home-page');
  };

});
