define([
  'knockout',
  'socketIO',
  'toast',
  'sounds'
], function (ko, socketIO, toast, sounds) {

  var socket;

  return function (d) {
    if (d && !socket) {
      var dJSON = ko.toJSON(d);
      socket = socketIO({ query: JSON.parse(dJSON) });
      socket.on('connect', function() {
        console.log('connected!');
      });
      socket.on('device:connected', function(device) {
        d.set(device);
        toast.success('Yehey!', 'Connected to internet.');
        sounds.connected.play();
      });
      socket.on('device:disconnected', function(device) {
        d.set(device);
        toast.error('Oppps!', 'Disconnected from internet.');
        sounds.disconnected.play();
      });
    }
    return socket;
  };

});
