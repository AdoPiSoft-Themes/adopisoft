define(['howler', 'app/utils/config'], function (howler, config) {

  var Howl = howler.Howl;
  var noop = function() {};
  var noopSound = {play: noop, stop: noop};

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

    var disconnected = new Sound(config.findField('sounds', 'disconnected_sound').value);
    var connected = new Sound(config.findField('sounds', 'connected_sound').value);
    var insertCoin = new Sound(config.findField('sounds', 'countdown_sound').value, 1500);
    var coinInserted = new Sound(config.findField('sounds', 'coin_inserted').value);

    return {
      connected: connected,
      disconnected: disconnected,
      insertCoin: insertCoin,
      coinInserted: coinInserted
    };

  } catch(e) {
    return {
      connected: noopSound,
      disconnected: noopSound,
      insertCoin: noopSound,
      coinInserted: noopSound
    };
  }

});
