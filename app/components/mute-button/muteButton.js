define(['knockout', 'sounds', 'app/utils/mutedCookie'], function(ko, sounds, muted){

  function vm() {
    var self = this;

    self.is_muted = ko.observable(muted.getMutedBoolean() || false)

    self.muteBtn = function(){
      muted.setMutedCookie("muted");
      sounds.background.pause();
      self.is_muted(muted.getMutedBoolean())
    }
    self.unMuteBtn = function(){
      muted.setMutedCookie("unmute")
      sounds.background.play();
      self.is_muted(muted.getMutedBoolean())
    }
  }
  ko.components.register('mute-button', {
    viewModel: vm,
    template: {
      require: 'text!app/components/mute-button/mute-button.html'
    }
  })

})
