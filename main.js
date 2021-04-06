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
  [
    'knockout', 'jquery', 'app/utils/config', 'app/routes', 'app/components', 'app/pages'
  ],
  function(ko, $, config, routes) {

    $(function() {

      function HeadVm() {
        this.pageTitle = ko.observable(config.pageTitle());
        this.styles = ko.observableArray(config.styles());
      }

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
      var headModel = new HeadVm();
      var headEl = document.getElementsByTagName('head')[0];
      var bodyEl = document.getElementsByTagName('body')[0];
      ko.applyBindings(headModel, headEl);
      ko.applyBindings(viewModel, bodyEl);

    });

  }
);
