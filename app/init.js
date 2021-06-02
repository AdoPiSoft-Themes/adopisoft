define([
  'app/observables/device',
  'socket',
  'app/services/plugin_assets'
], function (device, socket, assets) {
  return function init(cb) {
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
  };
});
