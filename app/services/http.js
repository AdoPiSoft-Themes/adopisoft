define([
  'core/services/http',
  'app/services/toast',
  'app/services/sounds'
], function (http, toast, sounds) {

  var srv = {};

  srv.catchError = function(res) {
    var message = http.catchError(res); 
    sounds.error.play();
    toast.error(message);
  };
  
  srv.queForPayment = function (opts, cb) {
    var data = {
      coinslot_id: opts.coinslot_id,
      type: opts.type,
      is_voucher: opts.is_voucher,
      provider_id: opts.provider_id,
      account_number: opts.account_number,
      product_keyword: opts.product_keyword
    };
    http.post('/portal/payments/que', data, cb);
  };

  srv.fetchCoinslots = function (cb) {
    http.get('/portal/coinslots', cb);
  };
  srv.currentPaymentQue = function (cb) {
    http.get('/portal/payments/current', cb);
  };
  srv.fetchRates = function (cb) {
    http.get('/settings/timer/rates', cb);
  };
  srv.timerConfig = function (cb) {
    http.get('/settings/timer/config', cb);
  };
  srv.donePayment = function (coinslot_id, cb) {
    http.post('/portal/payments/done', {coinslot_id: coinslot_id}, cb);
  };
  srv.activateVoucher = function(code, cb) {
    http.post('/portal/vouchers/activate', {code: code}, cb);
  };
  srv.getVouchers = function(cb) {
    http.get('/portal/vouchers/list', cb);
  };

  // Eload
  srv.checkEloadAvailability = function(cb) {
    http.get('/portal/eload/is-available', cb);
  };

  srv.getEloadClientData = function(acc_number, cb) {
    http.get('/portal/eload/customer-data?account_number=' + acc_number, cb);
  };

  srv.getEloadProviders = function(acc_number, cb) {
    http.get('/portal/eload/providers?account_number=' + acc_number, cb);
  };

  srv.getEloadPromos = function(opts, cb) {
    var params = Object.keys(opts).map(function (k) {
      return encodeURIComponent(k) + '=' + encodeURIComponent(opts[k]);
    }).join('&');
    http.get('/portal/eload/promos?' + params, cb);
  };

  srv.getRegularDenoms = function(provider_id, cb) {
    http.get('/portal/eload/regular-denoms?provider_id=' + provider_id, cb);
  };

  srv.activateEloadVoucher = function(account_number, code, cb) {
    http.post('/portal/eload/activate-voucher', {
      account_number: account_number,
      code: code
    }, cb);
  };

  srv.checkEloadProvider = function(id, product_keyword, cb) {
    http.post('/portal/eload/check-provider', { id: id, product_keyword: product_keyword }, cb);
  };

  srv.getRelatedTxn = function(account_number, product_keyword, cb) {
    http.get('/portal/eload/related-txn?account_number=' + account_number + '&product_keyword=' + product_keyword, cb);
  };

  srv.customerPurchase = function(opts, cb) {
    http.post('/u/api/customer/purchase', opts, cb);
  };

  srv.purchaseLoad = function(account_number, provider_id, product_keyword, voucher_id, cb) {
    http.post('/portal/eload/purchase', {
      account_number: account_number,
      provider_id: provider_id,
      product_keyword: product_keyword,
      voucher_id: voucher_id
    }, cb);
  };

  return srv;
});
