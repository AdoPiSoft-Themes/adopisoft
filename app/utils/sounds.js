define(['howler', 'app/utils/config'], function (howler, config) {
  function noop() {}
  try {
    var Howl = howler.Howl;

    var disconnected = new Howl({src: config.findField('sounds', 'disconnected_sound').value});
    var connected = new Howl({src: config.findField('sounds', 'connected_sound').value});

    return {
      connected: connected,
      disconnected: disconnected
    };

  } catch(e) {
    return {
      connected: {play: noop},
      disconnected: {play: noop}
    };
  }

});
