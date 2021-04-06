requirejs.config({
  baseUrl: '',
  paths:   {
    text:     'libs/requirejs/text-2.0.16',
    json:     'libs/requirejs/json-0.4.0',
    css: 'libs/requirejs/css-0.3.1.min',
    knockout: 'libs/knockout/knockout-latest',
    jquery:   'libs/jquery/jquery-1.10.2.min',
    lightslider: 'libs/lightslider/js/lightslider.min'
  },
  packages: [
    'app/components',
    'app/pages'
  ],
  shim: {
    lightslider: {deps: ['jquery']}
  }
});

// Start the main app logic.
requirejs(
  ['knockout', 'jquery', 'app/routes', 'css!styles/normalize', 'app/components', 'app/pages'],
  function(ko, $, routes) {

    $(function() {

      function RootVm() {
        this.page = ko.observable(routes[0].page);
        this.routes = routes;
        this.isCurrentPage = function (page) {
          return page === this.page();
        };
        this.navigate = function (page) {
          this.page(page);
        };
      }

      var viewModel = new RootVm();
      ko.applyBindings(viewModel);

    });

  }
);
