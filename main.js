requirejs.config({
  baseUrl: '',
  paths:   {
    text:     'libs/requirejs/text-2.0.16',
    json:     'libs/requirejs/json-0.4.0',
    css: 'libs/requirejs/css-0.3.1.min',
    socketIO: 'libs/socket.io/socket.io-2.1.1.min',
    knockout: 'libs/knockout/knockout-latest',
    howler: 'libs/howler/howler.core.min',
    domready: 'libs/domready',
    clipboard: 'libs/clipboard.min',
    getElementsByClassName: 'libs/polyfills/getElementsByClassName',

    // app services
    timerConfig: 'app/services/timerConfig',
    toast: 'app/services/toast',
    modal: 'app/services/modal',
    http: 'app/services/http',
    redirect: 'app/services/redirect',
    socket: 'app/services/socket',
    sounds: 'app/services/sounds',
    sessions: 'app/services/sessions',
    wifiRates: 'app/services/wifiRates',
    rootVM: 'app/root/RootVM'
  }
});

// Start the main app logic.
require([
  'knockout',
  'rootVM',
  'domready',
  'socket',
  'app/observables/device',
  'json!/client/plugins/assets.json',
  'app/bindings',
  'app/components',
  'app/eload-components',
  'app/pages',
  'app/pages',
  'app/services/config'
], function(ko, rootVM, domready, socket, device, assets) {

  function init(cb) {
    device.fetch(function (d) {
      var socket_instance = socket(d);
      window.Socket = {
        getInstance: function() {
          return socket_instance;
        }
      };

      // insert plugin assets
      for(var i = 0; i < assets.length; i++) {
        var p = assets[i];
        for (var x = 0; x < p.assets.scripts.length; x++) {
          var js_src = p.assets.scripts[x];
          var s = document.createElement('script');
          s.src = encodeURI(js_src);
          document.getElementsByTagName('head')[0].appendChild(s);
        }
        for (var y = 0; y < p.assets.styles.length; y++) {
          var css_src = p.assets.styles[y];
          var link = document.createElement('link');
          link.href = encodeURI(css_src);
          link.type = 'text/css';
          link.rel = 'stylesheet';
          document.getElementsByTagName('head')[0].appendChild(link);
        }
      }

      cb();
    });
  }

  function onLoad() {
    init(function () {
      var headEl = document.getElementsByTagName('head')[0];
      var bodyEl = document.getElementsByTagName('body')[0];
      ko.applyBindings(rootVM, headEl);
      ko.applyBindings(rootVM, bodyEl);
    });
  }

  domready(onLoad);

}, function(err) {
  var failedId = err.requireModules && err.requireModules[0];
  if (failedId === 'json!/settings/portal/config.json' || failedId === 'json!/client/plugins/assets.json') {
    window.location.reload();
  }
});
