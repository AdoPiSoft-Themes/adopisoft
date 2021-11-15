define(['knockout', 'sounds', 'mute'],function(ko, sounds,mute){
	
	function vm(){
		var self =  this;
		self.is_muted = ko.observable(mute.is_sound_muted);

		self.muteBtn = function(){
			mute.setMuted(true);
			sounds.background.pause();
			self.is_muted(mute.is_sound_muted)
		}
		self.unMuteBtn = function(){
			mute.setMuted(false)
			sounds.background.play();
			self.is_muted(mute.is_sound_muted)
		}
	}
	ko.components.register('mute-button', {
		viewModel: vm,
		template: {
			require: 'text!app/components/mute-button/mute-button.html'
		}
	})
})