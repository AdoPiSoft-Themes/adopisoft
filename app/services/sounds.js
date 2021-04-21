define(['howler', 'app/services/config'], function (howler, config) {

  var noop = function() {};
  var noopSound = {play: noop, stop: noop};
  var Howl = howler.Howl;

  function Sound(sound) {
    var self = this;
    self._loop = sound.loop;
    self._loopDelay = sound.loop_delay;
    self._loopOnly = sound.loop && !sound.loop_delay;
    self._sound = new Howl({src: sound.src, loop: self._loopOnly});
    self.play = function () {
      if (self._loopDelay) {
        self._sound.play();
        self._timeout = setTimeout(function () {
          self.play();
        }, self._loopDelay);
      } else {
        self._sound.play();
      }
    };
    self.stop = function() {
      if (self._timeout) clearTimeout(self._timeout);
      self._sound.stop();
      self._timeout = null;
    };
  }

  try {

    var disconnected = new Sound(config.findField('sounds', 'disconnected_sound'));
    var connected = new Sound(config.findField('sounds', 'connected_sound'));
    var insertCoin = new Sound(config.findField('sounds', 'countdown_sound'));
    var coinInserted = new Sound(config.findField('sounds', 'coin_inserted'));
    var error = new Sound(config.findField('sounds', 'error_sound'));

    return {
      connected: connected,
      disconnected: disconnected,
      insertCoin: insertCoin,
      coinInserted: coinInserted,
      error: error
    };

  } catch(e) {
    return {
      connected: noopSound,
      disconnected: noopSound,
      insertCoin: noopSound,
      coinInserted: noopSound,
      error: noopSound
    };
  }

});
