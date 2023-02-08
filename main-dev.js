requirejs.config({
  baseUrl: '',
  paths:   {
    text:  './libs/requirejs/text-2.0.16',
    json:  './libs/requirejs/json-0.4.0',
    css: './libs/requirejs/css-0.3.1.min',
    socketIO: './libs/socket.io/socket.io-2.1.1.min',
    knockout: './libs/knockout/knockout-latest',
    howler: './libs/howler/howler.core.min',
    jquery: './libs/jquery/jquery.min',
    domready: './libs/domready',
    clipboard: './libs/clipboard.min',
    getElementsByClassName: './libs/polyfills/getElementsByClassName',
    timerConfig: './app/services/timerConfig',
    toast: './app/services/toast',
    modal: './app/services/modal',
    http: './app/services/http',
    redirect: './app/services/redirect',
    socket: './app/services/socket',
    sounds: './app/services/sounds',
    translator: './app/services/translator',
    sessions: './app/services/sessions',
    wifiRates: './app/services/wifiRates',
    rootVM: './app/root/RootVM'
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
  'app/init',
  'translator',
  'app/bindings',
  'app/pages',
  'app/services/config',
  'app/components/app-root/AppComponent',
], function(ko, rootVM, domready, init, translator) {

  function onLoad() {
    translator.init(function () {
      init(function () {
        var headEl = document.getElementsByTagName('head')[0];
        var bodyEl = document.getElementsByTagName('body')[0];
        ko.applyBindings(rootVM, headEl);
        ko.applyBindings(rootVM, bodyEl);
      });
    })
  }

  domready(onLoad);

}, function(err) {
  var failedId = err.requireModules && err.requireModules[0];
  if (failedId === 'json!/settings/portal/config.json' || failedId === 'json!/client/plugins/assets.json') {
    window.location.reload();
  }
});
