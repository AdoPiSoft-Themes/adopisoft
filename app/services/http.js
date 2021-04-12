define([
  'libs/ajax',
  'toast'
], function (ajax, toast) {

  function Http () {
    this.get = function (url, cb) {
      try {
        ajax({
          url: url,
          success: function (data) {
            cb(null, data);
          },
          error: cb
        });
      } catch(e) { cb(e); }
    };
    this.post = function (url, data, cb) {
      var callback = typeof data === 'function' ? data : cb; 
      try {
        ajax({
          url: url,
          method: 'POST',
          data: data,
          success: function (data) {
            callback(null, data);
          },
          error: function(e) {
            callback(e);
          }
        });
      } catch(e) {
        callback(e);
      }
    };
    this.catchError = function(http) {
      var e = http.responseText ? JSON.parse(http.responseText) : {};
      var message = e.error || e.message || 'Something went wrong';
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
    this.fetchCoinslots = function (cb) {
      this.get('/client/coinslots', cb);
    };
    this.queForPayment = function (opts, cb) {
      var data = {
        coinslot_id: opts.coinslot_id,
        type: opts.type,
        is_voucher: opts.is_voucher
      };
      this.post('/client/payments/que', data, cb);
    };
    this.getDevice = function (cb) {
      this.get('/client/device', cb);
    };
    this.currentPaymentQue = function (cb) {
      this.get('/client/payments/current', cb);
    };
    this.timerConfig = function (cb) {
      this.get('/settings/timer/config', cb);
    };
  }
  return new Http();
});
