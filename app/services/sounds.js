define(['howler', 'app/services/config'], function (howler, config) {

  var noop = function() {};
  var noopSound = {play: noop, stop: noop};
  var Howl = howler.Howl;

  function Sound(src, loopDelay) {
    var self = this;
    self._sound = new Howl({src: src});
    self.play = function () {
      if (loopDelay) {
        self._sound.play();
        self._timeout = setTimeout(function () {
          self.play();
        }, loopDelay);
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
    var insertCoin = new Sound(config.findField('sounds', 'countdown_sound'), 1000);
    var coinInserted = new Sound(config.findField('sounds', 'coin_inserted'));
    var error = new Sound(config.findField('sounds', 'error_sound'));
    var eload_processing = new Sound(config.findField('sounds', 'eload_processing'));
    var eload_queued = new Sound(config.findField('sounds', 'eload_queued'));
    var eload_successful = new Sound(config.findField('sounds', 'eload_successful'));
    var eload_failed = new Sound(config.findField('sounds', 'eload_failed'));

    return {
      connected: connected,
      disconnected: disconnected,
      insertCoin: insertCoin,
      coinInserted: coinInserted,
      error: error,
      eload_processing: eload_processing,
      eload_queued: eload_queued,
      eload_successful: eload_successful,
      eload_failed: eload_failed
    };

  } catch(e) {
    return {
      connected: noopSound,
      disconnected: noopSound,
      insertCoin: noopSound,
      coinInserted: noopSound,
      error: noopSound,
      eload_processing: noopSound,
      eload_queued: noopSound,
      eload_successful: noopSound,
      eload_failed: noopSound
    };
  }

});
