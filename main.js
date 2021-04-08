requirejs.config({
  baseUrl: '',
  paths:   {
    text:     'libs/requirejs/text-2.0.16',
    json:     'libs/requirejs/json-0.4.0',
    css: 'libs/requirejs/css-0.3.1.min',
    knockout: 'libs/knockout/knockout-latest',
    jquery:   'libs/jquery/jquery-1.10.2.min',
    toast: 'libs/toast/toast.min',
    howler: 'libs/howler/howler.core.min'
  }
});

// Start the main app logic.
requirejs(
  [
    'knockout', 'jquery', 'app/root/RootVM', 'app/root/HeadVM', 'app/pages/index'
  ],
  function(ko, $, viewModel, headModel) {
    $(function() {

      var headEl = document.getElementsByTagName('head')[0];
      var bodyEl = document.getElementsByTagName('body')[0];
      ko.applyBindings(headModel, headEl);
      ko.applyBindings(viewModel, bodyEl);
      $('#loading').remove();
      $('.footer').show();

    });
  }
);
