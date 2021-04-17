define([
  'app/utils/ajax',
  'toast'
], function (ajax, toast) {

  function Http () {
    var http = this;
    http.get = function (url, cb) {
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
    http.post = function (url, data, cb) {
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
    http.catchError = function(http) {
      var e = http.responseText ? JSON.parse(http.responseText) : {};
      var message = e.error || e.message || 'Something went wrong';
      toast.error(message);
    };
    http.fetchSessions = function (cb) {
      http.get('/client/sessions', cb);
    };
    http.startSession = function(s_id, cb) {
      http.post('/client/sessions/' + s_id + '/start', cb);
    };
    http.pauseSession = function (s_id, cb) {
      http.post('/client/sessions/' + s_id + '/pause', cb);
    };
    http.fetchRates = function (cb) {
      http.get('/settings/timer/rates', cb);
    };
    http.fetchCoinslots = function (cb) {
      http.get('/client/coinslots', cb);
    };
    http.queForPayment = function (opts, cb) {
      var data = {
        coinslot_id: opts.coinslot_id,
        type: opts.type,
        is_voucher: opts.is_voucher
      };
      http.post('/client/payments/que', data, cb);
    };
    http.getDevice = function (cb) {
      http.get('/client/device', cb);
    };
    http.currentPaymentQue = function (cb) {
      http.get('/client/payments/current', cb);
    };
    http.timerConfig = function (cb) {
      http.get('/settings/timer/config', cb);
    };
    http.donePayment = function (coinslot_id, cb) {
      http.post('/client/payments/done', {coinslot_id: coinslot_id}, cb);
    };
    http.activateVoucher = function(code, cb) {
      http.post('/vouchers/activate', {code: code}, cb);
    };
    http.getVouchers = function(cb) {
      http.get('/vouchers/list', cb);
    };

    // Eload
    http.checkEloadAvailability = function(cb){
      http.get("/client/eload/is-available", cb)
    }

    http.getEloadClientData = function(acc_number, cb) {
     http.get("/client/eload/customer-data?account_number=" + acc_number, cb)
   }

    http.getEloadProviders = function(acc_number, cb){
      http.get("/client/eload/providers?account_number=" + acc_number, cb);
    }

    http.getEloadPromos = function(opts, cb){
      var params = Object.keys(opts).map(function (k) {
        return encodeURIComponent(k) + "=" + encodeURIComponent(opts[k]);
      }).join("&");
      http.get("/client/eload/promos?" + params, cb);
    }

    http.getRegularDenoms = function(provider_id, cb) {
      http.get("/client/eload/regular-denoms?provider_id=" + provider_id, cb)
    }

    http.activateEloadVoucher = function(account_number, code, cb) {
      http.post("/client/eload/activate-voucher", {
        account_number,
        code,
      }, cb)
    }

    http.checkEloadProvider = function(id, cb) {
      http.post("/client/eload/check-provider", { id }, cb)
    }

    http.getRelatedTxn = function(account_number, product_keyword, cb) {
      http.get("/client/eload/related-txn?account_number="+account_number+"&product_keyword="+product_keyword, cb)
    }

    http.getCurrentUser = function(cb) {
      http.get("/user/me", cb)
    }

    http.customerPurchase = function(opts, cb) {
      http.post("/customer/purchase", opts, cb)
    }

    // /eload
  }

  return new Http();
});
