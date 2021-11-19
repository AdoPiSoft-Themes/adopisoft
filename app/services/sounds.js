define([
  'howler',
  'core/services/config'
], function (howler, config) {

  var noop = function() {};
  var noopSound = {play: noop, stop: noop};
  var Howl = howler.Howl;

  function Sound(sound) {
    var self = this;
    self.play = function () {
      self._loop = sound.loop;
      self._loopDelay = sound.loop_delay;
      self._loopOnly = sound.loop && !sound.loop_delay;
      self._sound = new Howl({src: encodeURI(sound.src), loop: self._loopOnly});
      if (self._loop && self._loopDelay) {
        self._sound.play();
        self._sound.on('end', function () {
          self._timeout = setTimeout(function () {
            self.play();
          }, self._loopDelay);
        });
      } else {
        self._sound.play();
      }
    };
    self.stop = function() {
      if (self._timeout) clearTimeout(self._timeout);
      if (self._sound) self._sound.stop();
      self._timeout = null;
    };
  }

  try {
    var background_src = config.findField('sounds', 'background_music');
    var background = background_src ? new Sound(background_src) : noopSound;
    var insertCoinBgOpts = config.findField('sounds', 'countdown_bg_sound');
    var insertCoinBg = insertCoinBgOpts ? new Sound(insertCoinBgOpts) : noopSound;
    var disconnected = new Sound(config.findField('sounds', 'disconnected_sound'));
    var connected = new Sound(config.findField('sounds', 'connected_sound'));
    var insertCoin = new Sound(config.findField('sounds', 'countdown_sound'));
    var coinInserted = new Sound(config.findField('sounds', 'coin_inserted'));
    var error = new Sound(config.findField('sounds', 'error_sound'));
    var eload_processing = new Sound(config.findField('sounds', 'eload_processing'));
    var eload_queued = new Sound(config.findField('sounds', 'eload_queued'));
    var eload_successful = new Sound(config.findField('sounds', 'eload_successful'));
    var eload_failed = new Sound(config.findField('sounds', 'eload_failed'));

    return {
      background: background,
      connected: connected,
      disconnected: disconnected,
      insertCoin: insertCoin,
      insertCoinBg: insertCoinBg,
      coinInserted: coinInserted,
      error: error,
      eload_processing: eload_processing,
      eload_queued: eload_queued,
      eload_successful: eload_successful,
      eload_failed: eload_failed
    };

  } catch(e) {
    return {
      background: noopSound,
      connected: noopSound,
      disconnected: noopSound,
      insertCoin: noopSound,
      insertCoinBg: noopSound,
      coinInserted: noopSound,
      error: noopSound,
      eload_processing: noopSound,
      eload_queued: noopSound,
      eload_successful: noopSound,
      eload_failed: noopSound
    };
  }

});
