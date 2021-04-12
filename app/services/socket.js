define([
  'knockout',
  'socketIO'
], function (ko, socketIO) {

  var socket;

  return function (d) {
    if (d && !socket) {
      var dJSON = ko.toJSON(d);
      socket = socketIO({ query: JSON.parse(dJSON) });
      socket.on('connect', function() {
        console.log('connected!');
      });
    }
    return socket;
  };

});
