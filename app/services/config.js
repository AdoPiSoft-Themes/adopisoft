define(['jquery'], function ($) {

  return function (cb) {
    var config_url = '/captive-portal/config.json'
    $.ajax({
      url: config_url,
      dataType: 'json',
      success: function (res) {
        cb(null, res)
      },
      error: function (e) {
        cb(e)
      }
    })
  }
})
