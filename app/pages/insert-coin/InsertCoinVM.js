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
  'app/components/progress-bar/ProgressBar',
  'app/components/seconds-format/SecondsFormat'
], function (ko, rootVM, http, sounds, toast, timerConfig, rates, socket, device, receipt, payment, secondsFormat, formatBytes) {
  function VM () {
    console.log(payment);
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
      wait_payment_seconds: ko.observable(100)
    };
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
        console.log('current payment que:', data);
        self.onPaymentReceived(data);
      });
    };
    self.onPaymentReceived = function (data) {
      console.log(data);
      self.que.coinslot_id(data.coinslot_id);
      self.que.total_amount(data.total_amount);
      self.que.type(data.type);
      self.que.wait_payment_seconds(data.wait_payment_seconds);
      if (data.session) {
        self.session.data_mb(data.session.data_mb);
        self.session.time_seconds(data.session.time_seconds);
      }
      if (data.voucher) {
        self.session.data_mb(data.voucher.megabytes);
        self.session.time_seconds(data.voucher.minutes * 60);
      }
      if (self.session.data_mb() > 0 || self.session.time_seconds() > 0) {
        sounds.coinInserted.play();
        toast.success('Total Amount: ' + rates.currency() + ' ' + self.que.total_amount(), 'Total Credits: ' + self.totalCredits());
      }
    };
    self.donePayment = function () {
      self.loading(true);
      http.donePayment(self.que.coinslot_id(), function(err, data) {
        if (err) self.loading(false);
        self.done(data);
      });
    };
    self.done = function (data) {
      console.log('DONE:', data);
      device.is_paying(false);
      if (self.hasPayment()) {
        receipt.isVoucher(payment.isVoucher());
        receipt.amount(data.total_amount);
        receipt.type(data.type);
        receipt.credits(self.totalCredits());
        if (payment.isVoucher()) receipt.voucherCode(data.voucher.code);
        if (!payment.isVoucher()) receipt.sessionId(data.session.id);
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
    };

    receipt.reset();
    sounds.insertCoin.play();
    socket().on('payment:received', self.onPaymentReceived);
    socket().on('payment:done', self.done);

  }

  return VM;
});
