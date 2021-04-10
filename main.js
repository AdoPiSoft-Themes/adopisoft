requirejs.config({
  baseUrl: '',
  paths:   {
    text:     'libs/requirejs/text-2.0.16',
    json:     'libs/requirejs/json-0.4.0',
    css: 'libs/requirejs/css-0.3.1.min',
    knockout: 'libs/knockout/knockout-latest',
    jquery:   'libs/jquery/jquery-1.10.2.min',
    toast: 'libs/toast/toast.min',
    howler: 'libs/howler/howler.core.min',
    rootVM: 'app/root/RootVM'
  },
  packages: [
    'app/bindings',
    'app/pages'
  ]
});

// Start the main app logic.
require([
  'knockout',
  'jquery',
  'rootVM',
  'app/bindings',
  'app/pages',
  'app/components/status-nav/StatusNavComponent',
  'app/components/banners/BannersComponent',
  'app/components/status-nav/StatusNavComponent',
  'app/components/sessions-table/SessionsTableComponent'
], function(ko, $, rootVM) {
  $(function() {

    var headEl = document.getElementsByTagName('head')[0];
    var bodyEl = document.getElementsByTagName('body')[0];
    ko.applyBindings(rootVM, headEl);
    ko.applyBindings(rootVM, bodyEl);
    $('#loading').remove();
    $('.footer').show();

  });
}
);
