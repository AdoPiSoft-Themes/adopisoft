define(['jquery', 'toast'], function ($, toast) {

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
    this.catchError = function(e) {
      var err = e.responseJSON || {};
      var message = err.error || err.message || 'Something went wrong';
      toast.error(message);
    };
    this.fetchSessions = function (cb) {
      this.get('/client/sessions', cb);
    };
    this.startSession = function(s_id, cb) {
      this.post('/client/sessions/' + s_id + '/start', cb);
    };
    this.pauseSession = function (s_id, cb) {
      this.post('/client/sessions/' + s_id + '/pause', cb);
    };
    this.fetchRates = function (cb) {
      this.get('/settings/timer/rates', cb);
    };
  }
  return new Http();
});
