define(['knockout', 'sounds', 'app/utils/mutedCookie', 'text!app/components/mute-button/mute-button.html'], function(ko, sounds, muted, tpl) {

  function vm() {
    var self = this;

    self.is_muted = ko.observable(muted.getMutedBoolean() || false);

    self.muteBtn = function() {
      muted.setMutedCookie('muted');
      if (sounds.background && typeof sounds.background.pause === 'function') {
        sounds.background.pause();
      }
      self.is_muted(muted.getMutedBoolean());
    };
    self.unMuteBtn = function() {
      muted.setMutedCookie('unmute');
      if (sounds.background && typeof sounds.background.play === 'function') {
        sounds.background.play();
      }
      self.is_muted(muted.getMutedBoolean());
    };
  }
  ko.components.register('mute-button', {
    viewModel: vm,
    template: tpl
  });
});
