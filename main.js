
requirejs.config({
  baseUrl: '.',
  paths:   {
    text:     'libs/requirejs/text-2.0.16',
    json:     'libs/requirejs/json-0.4.0',
    knockout: 'libs/knockout/knockout-latest',
    pager:    'libs/pager/pager-1.1.0.min',
    jquery:   'libs/jquery/jquery-1.10.2.min',
    lightslider: 'libs/lightslider/js/lightslider.min'
  },
  packages: [
    'app/components'
  ],
  shim: {
    lightslider: {deps: ['jquery']}
  }
});

// Start the main app logic.
requirejs(['knockout', 'pager', 'app/components', 'app/routes'],
  function(ko, pager, components, routes) {

    $(function() {
      pager.Href.hash = '#/';

      var viewModel = {
        routes: routes
      };

      pager.extendWithPage(viewModel);
      ko.applyBindings(viewModel);
      pager.start();

    });

  });
