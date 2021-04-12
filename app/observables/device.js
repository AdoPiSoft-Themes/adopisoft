define([
  'knockout',
  'app/services/socket',
  'app/services/http'
], function(ko, socket, http) {
  var d = {
    id: ko.observable(0),
    mac_address: ko.observable(''),
    ip_address: ko.observable(''),
    hostname: ko.observable(''),
    is_paying: ko.observable(''),
    status: ko.observable('')
  };

  http.getDevice(function(err, device) {
    if (!err) {
      d.id(device.id);
      d.mac_address(device.mac_address);
      d.ip_address(device.ip_address);
      d.hostname(device.hostname);
      d.is_paying(device.is_paying);
      d.status(device.status);
      socket(d);
    }
  });

  return d;
});
