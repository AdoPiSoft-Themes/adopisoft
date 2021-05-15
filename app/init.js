define([
  'app/observables/device',
  'socket'
], function (device, socket) {
  return function init(cb) {
    device.fetch(function (d) {
      var socket_instance = socket(d);
      window.Socket = {
        getInstance: function() {
          return socket_instance;
        }
      };

      cb();
    });
  };
});
