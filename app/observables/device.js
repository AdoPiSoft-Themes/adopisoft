define([
  'knockout',
  'toast',
  'http'
], function(ko, toast, http) {
  var d = {
    id: ko.observable(0),
    mac_address: ko.observable(''),
    ip_address: ko.observable(''),
    hostname: ko.observable(''),
    is_paying: ko.observable(''),
    status: ko.observable(''),
    passcode: ko.observable(''),
    is_clone: ko.observable(false),
    is_ready: ko.observable(false),
    readyCallbacks: [],
    set: function(device) {

      http.tmp_client_id = device.tmp_client_id

      d.id(device.id);
      d.mac_address(device.mac_address);
      d.ip_address(device.ip_address);
      d.hostname(device.hostname);
      d.passcode(device.passcode);
      d.is_clone(device.is_clone);
      d.is_paying(device.is_paying);
      d.status(device.status);
    },
    fetch: function(cb) {
      http.getDevice(function(err, device) {
        if (err) {
          window.alert('Unable to sync device information. The page will have to reload.');
          window.location.reload();
        } else {
          d.set(device);
          cb(d);

          for (var i = 0; i < d.readyCallbacks.length; i++) {
            d.readyCallbacks[i]()
          }
        }
      });
    },
    onReady: function(cb) {
      if (typeof cb !== 'function') return
      if (d.is_ready()) {
        return cb()
      }

      d.readyCallbacks.push(cb)
    }
  };
  return d;
});
