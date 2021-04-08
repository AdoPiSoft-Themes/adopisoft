define([
  'knockout',
  'app/routes',
  'app/utils/config',
  'app/observables/payment'
], function (ko, routes, config, payment) {

  function RootVm() {
    this.intent = ko.observable('');
    this.page = ko.observable(routes[0].component);
    this.footerHtml = config.footerHtml();
    this.routes = routes;
    this.isCurrentPage = function (route) {
      return route.component === this.page();
    };
    this.navigate = function (page) {
      this.page(page);
    };
    this.buyWifi = function () {
      payment.intent('wifi');
      this.navigate('select-coinslot-page');
    };
    this.buyVoucher = function () {
      this.intent('buy_voucher');
      this.navigate('select-coinslot-page');
    };
  }

  return new RootVm();
});
