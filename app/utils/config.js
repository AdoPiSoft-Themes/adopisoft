(function(window) {
  define(function() {

    var url = '/captive-portal/config.json';
    var config = {};

    config.init = function (cb) {
      $.ajax({
        url: url,
        dataType: 'json',
        success: function (data) {
          window.PORTAL_CONFIG = data;
          cb();
        },
        error: function (e) {
          cb(e);
        }
      });
    };

    return config;

  });

})(window);
