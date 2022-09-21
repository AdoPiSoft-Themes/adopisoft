define(function(){
  const maxAge = (24 * 60 * 60 * 1000) * 30 // 30 days
  function Mute(){
    this.setMutedCookie = (value) => {
      document.cookie = "is_muted=" + value + ";" + maxAge + "; path=/";
    }
    this.getMutedCookieStr = function(){
      const _name = "is_muted=";

      var cookies = document.cookie.split(';');
      for(var i=0;i < cookies.length;i++) {
          var c = cookies[i];
          while (c.charAt(0)==' ') c = c.substring(1,c.length);
          if (c.indexOf(_name) == 0) return c.substring(_name.length,c.length);
      }
      return null;
    }
    this.getMutedBoolean = function(){
      if(this.getMutedCookieStr() === 'muted')
        return true;
      else 
        return false;
      return null;
    }

  }

  return new Mute();
})