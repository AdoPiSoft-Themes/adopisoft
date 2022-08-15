define([
  'knockout',
  'rootVM',
  'http',
  'sounds',
  'toast',
  'timerConfig',
  'wifiRates',
  'socket',
  'app/observables/device',
  'app/observables/receipt',
  'app/observables/payment',
  'app/utils/shortSecondsFormat',
  'app/utils/formatBytes',
  'app/utils/array.includes',
  'app/components/progress-bar/ProgressBar',
  'app/components/seconds-format/SecondsFormat',
  'app/components/eload-payment/EloadPayment',
  'app/components/wallet-topup/WalletTopup'
], function (ko, rootVM, http, sounds, toast, timerConfig, rates, socket, device, receipt, payment, secondsFormat, formatBytes, includes) {

  function VM () {
    var prev_amount = 0;
    var fetch_timeout = null;
    var self = this;
    self.payment = payment;
    self.config = timerConfig;
    self.rates = rates;
    self.loading = ko.observable(false);
    self.que = {
      coinslot_id: ko.observable(0),
      total_amount: ko.observable(0),
      type: ko.observable(''),
      voucher: {},
      wait_payment_seconds: ko.observable(100),

      customer: ko.observable(0),
      eload_price: ko.observable(0),
      customer_credits: ko.observable(0),
      account_number: ko.observable(''),
      product_keyword: ko.observable('')
    };

    self.eload_wallet_topup = ko.pureComputed(function() {
      return includes(['eload', 'wallet_topup'], self.que.type());
    });

    self.session = {
      data_mb: ko.observable(0),
      time_seconds: ko.observable(0)
    };
    self.koDescendantsComplete = function () {
      rootVM.showingStatusNav(false);
      rootVM.showingBanners(false);
      rootVM.showingSessionsTable(false);
      self.fetch();
    };
    self.fetch = function () {
      http.currentPaymentQue(function (err, data) {
        if (!err) {
          self.onPaymentReceived(data);
        }
        fetch_timeout = setTimeout(function () {
          self.fetch();
        }, 2000);
      });
    };
    self.onPaymentReceived = function (data) {
      self.que.coinslot_id(data.coinslot_id);
      self.que.total_amount(data.total_amount);
      self.que.type(data.type);
      self.que.wait_payment_seconds(data.wait_payment_seconds);

      self.que.product_keyword(data.product_keyword);
      self.que.eload_price(data.eload_price);
      self.que.account_number(data.account_number);
      self.que.customer(data.customer);
      self.que.customer_credits(data.customer_credits);

      if (data.session) {
        self.session.data_mb(data.session.data_mb);
        self.session.time_seconds(data.session.time_seconds);
      }
      if (data.voucher) {
        self.session.data_mb(data.voucher.megabytes);
        self.session.time_seconds(data.voucher.minutes * 60);
      }
      if (data.total_amount > prev_amount) {
        if (self.session.data_mb() > 0 || self.session.time_seconds() > 0) {
          toast.success('Total Amount: ' + rates.currency() + ' ' + self.que.total_amount(), 'Total Credits: ' + self.totalCredits());
          sounds.coinInserted.play();
        } else if (data.amount > 0) {
          toast.success('Payment Received: ' + rates.currency() + data.amount.toFixed(2));
          sounds.coinInserted.play();
        }
        prev_amount = data.total_amount;
      }

      if (data.wait_payment_seconds <= 0) { // 3s allowance
        self.doneTimeout = setTimeout(self.donePayment, 3000);
      } else if(self.doneTimeout && data.wait_payment_seconds > 0) {
        clearTimeout(self.doneTimeout);
      }
    };

    self.donePayment = function () {
      self.loading(true);
      http.donePayment(self.que.coinslot_id(), function(err, data) {
        if (err) {
          self.loading(false);
          http.catchError(err);
        }
        self.done(data);
      });
    };

    self.done = function (data) {
      device.is_paying(false);
      if (self.hasPayment()) {
        receipt.isVoucher(payment.isVoucher());
        var total_amount = data.total_amount || self.que.total_amount();
        var type = data.type || self.que.type();
        receipt.amount(total_amount);
        receipt.type(type);

        receipt.credits(self.totalCredits());
        if (payment.isVoucher() && data.voucher) receipt.voucherCode(data.voucher.code);
        if (!payment.isVoucher() && data.session) receipt.sessionId(data.session.id);
        rootVM.navigate('receipt-page');
      } else {
        rootVM.navigate('home-page');
      }
    };

    self.totalCredits = ko.pureComputed(function() {
      if (self.que.type() === 'time') {
        return secondsFormat(self.session.time_seconds());
      }
      if (self.que.type() === 'data') {
        return formatBytes(self.session.data_mb());
      }
      if (self.que.type() === 'time_or_data') {
        var s = secondsFormat(self.session.time_seconds());
        var d = formatBytes(self.session.data_mb());
        return s + '/' + d;
      }
    });

    self.hasPayment = ko.pureComputed(function() {
      return self.que.total_amount() > 0;
    });

    self.dispose = function () {
      socket().removeListener('payment:received', self.onPaymentReceived);
      socket().removeListener('payment:done', self.done);
      sounds.insertCoin.stop();
      sounds.insertCoinBg.stop();
      if (fetch_timeout) {
        clearTimeout(fetch_timeout);
      }
    };

    receipt.reset();
    sounds.insertCoin.play();
    sounds.insertCoinBg.play();
    socket().on('payment:received', self.onPaymentReceived);
    socket().on('payment:done', self.done);

  }

  return VM;

});
