define(['jquery'], function ($) {
  function Http () {
    this.get = function (url, cb) {
      try {
        $.ajax({
          url: url,
          dataType: 'json',
          success: function (data) {
            cb(null, data);
          },
          error: cb
        });
      } catch(e) { cb(e); }
    };
    this.post = function (url, data, cb) {
      var callback = $.isFunction(data) ? data : cb; 
      try {
        $.ajax({
          url: url,
          method: 'POST',
          dataType: 'json',
          data: data,
          success: function (data) {
            callback(null, data);
          },
          error: function(e) {
            var err = e.responseJSON || {};
            callback(err.error || err.message || 'Something went wrong');
          }
        });
      } catch(e) {
        callback(e);
      }
    };
  }
  return new Http();
});
