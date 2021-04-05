define(function() {

  var url = '/captive-portal/config.json';
  var config = {};

  config.init = function (cb) {
    $.ajax({
      url: url,
      dataType: 'json',
      success: function (data) {
        config.loaded = true;
        config.data = data;
        cb();
      },
      error: function (e) {
        cb(e);
      }
    });
  };

  return config;

});

