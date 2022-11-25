define(function () {
  const maxAge = (24 * 60 * 60 * 1000) * 30 // 30 days
  function Mute(){
    this.setMutedCookie = function(value) {
      document.cookie = "is_muted=" + value + ";" + maxAge + "; path=/";
    }
    this.getMutedCookieStr = function(){
      const _name = "is_muted=";

      var cookies = document.cookie.split(';');
      for(var i=0;i < cookies.length;i++) {
          var c = cookies[i];
          while (c.charAt(0)==' ') { c = c.substring(1,c.length) };
          if (c.indexOf(_name) == 0) return c.substring(_name.length, c.length);
      }
      return '';
    }
    this.getMutedBoolean = function(){
      var is_muted = null
      if(this.getMutedCookieStr() === 'muted')
        is_muted = true
      else 
        is_muted = false;
      return is_muted;
    }
  }
  return new Mute()
})
