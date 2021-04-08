define(['knockout', 'app/routes', 'app/utils/config'], function (ko, routes, config) {

  function RootVm() {
    this.intent = ko.observable('');
    this.page = ko.observable(routes[0].page);
    this.footerHtml = config.footerHtml();
    this.routes = routes;
    this.isCurrentPage = function (page) {
      return page === this.page();
    };
    this.navigate = function (page) {
      this.page(page);
    };
    this.buyWifi = function () {
      this.intent('buy_wifi');
      this.navigate('insert-coin');
    };
    this.buyVoucher = function () {
      this.intent('buy_voucher');
      this.navigate('insert-coin');
    };
  }

  return new RootVm();
});
