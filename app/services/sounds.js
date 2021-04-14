define(['howler', 'app/services/config'], function (howler, config) {

  var noop = function() {};
  var noopSound = {play: noop, stop: noop};
  var Howl = howler.Howl;

  function Sound(src, loopDelay) {
    var self = this;
    this._sound = new Howl({src: src});
    this.play = function () {
      if (loopDelay) {
        this._sound.play();
        this._timeout = setTimeout(function () {
          self.play();
        }, loopDelay);
      } else {
        self._sound.play();
      }
    };
    this.stop = function() {
      if (this._timeout) clearTimeout(this._timeout);
      this._sound.stop();
      this._timeout = null;
    };
  }

  try {

    var disconnected = new Sound(config.findField('sounds', 'disconnected_sound'));
    var connected = new Sound(config.findField('sounds', 'connected_sound'));
    var insertCoin = new Sound(config.findField('sounds', 'countdown_sound'), 1000);
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
