define([
  'app/observables/device',
  'socket',
  'app/services/plugin_assets'
], function (device, socket, assets) {
  return function init(cb) {
    var socket_instance;
    var socket_listener_que = []

    window.Socket = {
      getInstance: function(fn) {
        if (socket_instance) {
          if (typeof fn === 'function') fn(socket_instance)
          return socket_instance;
        } else if(typeof fn === 'function') {
          socket_listener_que.push(fn)
        }
      }
    };

    device.fetch(function (d) {
      socket_instance = socket(d);

      for (var e = 0; e < socket_listener_que.length; e++) {
        socket_listener_que[e](socket_instance)
      }

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
    });
    cb();
  };
});
