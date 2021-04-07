define(['howler', 'app/utils/config'], function (howler, config) {
  var Howl = howler.Howl;

  var disconnected = new Howl({src: config.findField('sounds', 'disconnected_sound').value});
  var connected = new Howl({src: config.findField('sounds', 'connected_sound').value});

  return {
    connected: connected,
    disconnected: disconnected
  };

});
