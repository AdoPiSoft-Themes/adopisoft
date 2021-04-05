
requirejs.config({
  //By default load any module IDs from js/lib
  baseUrl: '.',
  //except, if the module ID starts with "app",
  //load it from the js/app directory. paths
  //config is relative to the baseUrl, and
  //never includes a ".js" extension since
  //the paths config could be for a directory.
  paths: {
    config: 'app/services/config',
    text: 'libs/requirejs/text-2.0.16',
    knockout: 'libs/knockout/knockout-3.5.0.min',
    jquery: 'libs/jquery/jquery-1.10.2.min',
    pager: 'libs/pager/pager-1.1.0.min',
    components: 'app/components/all'
  }
});

// Start the main app logic.
requirejs(['jquery', 'knockout', 'pager', 'components', 'config'],
  function   ($, ko, pager, components, config) {


    $(function () {
      pager.Href.hash = '#!/';

      config(function (err, data) {
        if (err)
          console.log('Error:', err)
        else {
          console.log('Config:', data)

          var viewModel = {}

          pager.extendWithPage(viewModel);
          ko.applyBindings(viewModel);
          pager.start();

        }
      })

    });

  });

