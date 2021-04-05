
requirejs.config({
  baseUrl: '.',
  paths:   {
    config:   'app/utils/config',
    routes:   'app/routes',
    text:     'libs/requirejs/text-2.0.16',
    knockout: 'libs/knockout/knockout-3.5.0.min',
    pager:    'libs/pager/pager-1.1.0.min',
    jquery:   'libs/jquery/jquery-1.10.2.min'
  },
  packages: [
    'app/components'
  ]
});

// Start the main app logic.
requirejs(['knockout', 'pager', 'app/components', 'config', 'routes'],
  function(ko, pager, components, config, routes) {

    $(function() {
      pager.Href.hash = '#/';

      config.init(function(err) {
        if (err) {
          alert('Something went wrong');
        } else {
          var viewModel = {
            routes: routes(config.data)
          };

          console.log(viewModel);

          pager.extendWithPage(viewModel);
          ko.applyBindings(viewModel);
          pager.start();

        }
      });

    });

  });
