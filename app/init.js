define([
  'app/observables/device',
  'socket',
  'app/services/plugin_styles'
], function (device, socket, assets) {
  return function init(cb) {
    device.fetch(function (d) {
      var socket_instance = socket(d);
      window.Socket = {
        getInstance: function() {
          return socket_instance;
        }
      };

      // insert plugin scripts
      var today = new Date();
      var id = today.getFullYear()+today.getMonth()+today.getDate()+today.getHours()
      var js_src = '/portal/plugins/scripts.js' + '?ref=' + id
      var s = document.createElement('script');
      s.src = encodeURI(js_src);
      document.getElementsByTagName('head')[0].appendChild(s);

      // insert plugin style assets
      for(var i = 0; i < assets.length; i++) {
        var css_src = assets[i];
        var link = document.createElement('link');
        link.href = encodeURI(css_src);
        link.type = 'text/css';
        link.rel = 'stylesheet';
        document.getElementsByTagName('head')[0].appendChild(link);
      }

      cb();
    });
  };
});
