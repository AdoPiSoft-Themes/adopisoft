define(function(){

	function Mute(){
		this.is_sound_muted = false;

		this.setMuted = function(m){
			this.is_sound_muted = m;
		}
	}

	return new Mute();
})