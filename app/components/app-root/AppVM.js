define([
  'knockout',
  'rootVM',
  'app/services/config',
  'app/observables/payment',
  'app/components/toast/ToastComponent',
  'app/components/status-nav/StatusNavComponent',
  'app/components/banners/Banners',
  'app/components/sessions-table/SessionsTableComponent',
  'app/components/modal/Modal',
  'app/components/footer/Footer'
], function (ko, rootVM, config, payment) {

  return function AppVM() {
    this.favicon = ko.observable(config.favicon());
    this.pageTitle = ko.observable(config.pageTitle());
    this.styles = ko.observableArray(config.styles());
    
    this.buyWifi = function () {
      payment.intent('wifi');
      this.navigate('select-coinslot-page');
    };

    this.buyVoucher = function () {
      this.intent('buy_voucher');
      this.navigate('select-coinslot-page');
    };

    this.buyEload = function () {
      this.navigate('buy-eload-page');
    };

    rootVM.page('home-page');
  };

});
