define([
  'knockout',
  'rootVM',
  'app/observables/device',
  'app/observables/receipt',
  'app/services/http',
  'app/services/sounds',
  'toast',
  'app/utils/timerConfig',
  'app/observables/wifiRates',
  'app/observables/payment',
  'app/services/socket',
  'app/utils/shortSecondsFormat'
], function (ko, rootVM, device, receipt, http, sounds, toast, timerConfig, rates, payment, socket, secondsFormat) {
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
      if (self.session.data_mb() > 0 || self.session.time_seconds() > 0) {
        sounds.coinInserted.play();
        toast.success('Total Amount: ' + rates.currency() + ' ' + self.que.total_amount(), 'Total Credits:</b>' + self.totalCredits());
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
        receipt.sessionId(data.session.id);
        receipt.amount(data.total_amount);
        receipt.type(data.type);
        receipt.credits(self.totalCredits());
        rootVM.navigate('receipt-page');
      } else {
        rootVM.navigate('home-page');
      }
    };
    self.totalCredits = ko.pureComputed(function() {
      if (self.que.type() === 'time') {
        return secondsFormat(self.session.time_seconds());
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
