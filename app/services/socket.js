define([
  'knockout',
  'socketIO',
  'toast',
  'sounds',
  'redirect',
  'translator',
  'http'
], function (ko, socketIO, toast, sounds, redirect, translator, http) {

  var socket;

  return function (d) {
    if (d && !socket) {
      var dJSON = ko.toJSON(d);
      socket = socketIO({ query: JSON.parse(dJSON) });
      socket.on('connect', function() {});
      socket.on('device:connected', function(device) {
        d.set(device);
        toast.success('Yehey!', translator.print('CONNECTED_TO_INTERNET'));
        sounds.connected.play();
        redirect.redirect();
      });
      socket.on('device:disconnected', function(device) {
        redirect.cancel();
        d.set(device);
        toast.error('Oppps!', translator.print('DISCONNECTED_FROM_INTERNET'));
        sounds.disconnected.play();
      });

      socket.on('customer:logout', function() {
        http.logoutCustomer();
      });
    }
    return socket;
  };

});
