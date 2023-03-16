define([
  'knockout',
  'socketIO',
  'toast',
  'sounds',
  'redirect',
  'http'
], function (ko, socketIO, toast, sounds, redirect, http) {

  var socket;

  return function (d) {
    if (d && !socket) {
      var dJSON = ko.toJSON(d);
      socket = socketIO({ query: JSON.parse(dJSON) });
      socket.on('connect', function() {});
      socket.on('device:connected', function(device) {
        d.set(device);
        toast.success('Yehey!', 'Connected to internet.');
        sounds.connected.play();
        redirect.redirect();
      });
      socket.on('device:disconnected', function(device) {
        redirect.cancel();
        d.set(device);
        toast.error('Oppps!', 'Disconnected from internet.');
        sounds.disconnected.play();
      });

      socket.on('device:ready', function() {
        d.is_ready(true)
      })

      setTimeout(function () {
        d.is_ready(true)
      }, 10000)

      socket.on('customer:logout', function() {
        http.logoutCustomer();
      });
    }
    return socket;
  };

});
