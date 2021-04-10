requirejs.config({
  baseUrl: '',
  paths:   {
    text:     'libs/requirejs/text-2.0.16',
    json:     'libs/requirejs/json-0.4.0',
    css: 'libs/requirejs/css-0.3.1.min',
    knockout: 'libs/knockout/knockout-latest',
    howler: 'libs/howler/howler.core.min',
    domready: 'libs/domready',
    getElementsByClassName: 'libs/polyfills/getElementsByClassName',
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
  'app/utils/config',
  'app/components/app-root/AppComponent',
  'app/components/toast/ToastComponent',
  'app/components/banners/BannersComponent'
], function(ko, mainVM, domready) {

  function onLoad() { 
    var headEl = document.getElementsByTagName('head')[0];
    var bodyEl = document.getElementsByTagName('body')[0];
    ko.applyBindings(mainVM, headEl);
    ko.applyBindings(mainVM, bodyEl);
  }

  domready(onLoad);

});
