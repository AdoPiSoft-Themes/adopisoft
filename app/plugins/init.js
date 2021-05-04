define([
  'http'
], function (http) {
  return function init(cb) {
    http.getPluginsAssets(function(err, assets) {
      if(err || !assets.length) return;
      for(var i = 0; i < assets.length; i++) {
        var asset = assets[i];
        if(asset.indexOf('.js') > -1) {
          var s = document.createElement('script');
          s.src = asset;
          document.getElementsByTagName('head')[0].appendChild(s);
        }else if(asset.indexOf('.css') > -1) {
          var link = document.createElement('link');
          link.href = asset;
          link.type = 'text/css';
          link.rel = 'stylesheet';
        }
      }
      if(cb) cb();
    });
  };
});
