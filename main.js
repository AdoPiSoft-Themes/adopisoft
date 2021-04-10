requirejs.config({
  baseUrl: '',
  paths:   {
    text:     'libs/requirejs/text-2.0.16',
    json:     'libs/requirejs/json-0.4.0',
    css: 'libs/requirejs/css-0.3.1.min',
    knockout: 'libs/knockout/knockout-latest',
    howler: 'libs/howler/howler.core.min',
    domready: 'app/utils/domready',
    toast: 'app/services/toast',
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
  'rootVM',
  'domready',
  'app/bindings',
  'app/pages',
  'app/components/toast/ToastComponent',
  'app/components/status-nav/StatusNavComponent',
  'app/components/banners/BannersComponent',
  'app/components/status-nav/StatusNavComponent',
  'app/components/sessions-table/SessionsTableComponent'
], function(ko, rootVM, domready) {

  function onLoad() { 
    var headEl = document.getElementsByTagName('head')[0];
    var bodyEl = document.getElementsByTagName('body')[0];
    var loading = document.getElementById('loading');
    var footer = document.getElementsByClassName('footer')[0];
    ko.applyBindings(rootVM, headEl);
    ko.applyBindings(rootVM, bodyEl);

    loading.parentNode.removeChild(loading); //remove loading text
    footer.style.display = 'block';// show footer

  }
  domready(onLoad);

});
