define([
  'app/observables/device',
  'app/services/socket'
], function (device, socket) {
  return function init(cb) {
    device.fetch(function (d) {
      socket(d);
      cb();
    });
  };
});
