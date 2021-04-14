define([
  'app/observables/device',
  'socket'
], function (device, socket) {
  return function init(cb) {
    device.fetch(function (d) {
      socket(d);
      cb();
    });
  };
});
