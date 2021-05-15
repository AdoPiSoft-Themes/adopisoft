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
        for (var x = 0; x < p.assets.scripts.length; x ++) {
          var asset = p.assets.scripts[x];
          var s = document.createElement('script');
          s.src = asset;
          document.getElementsByTagName('head')[0].appendChild(s);
        }
        for (var x = 0; x < p.assets.styles.length; x ++) {
          var asset = p.assets.styles[x];
          var link = document.createElement('link');
          link.href = asset;
          link.type = 'text/css';
          link.rel = 'stylesheet';
          document.getElementsByTagName('head')[0].appendChild(link);
        }
      }

      cb();
    });
  };
});
