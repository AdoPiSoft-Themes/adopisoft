define([
  'knockout',
  'rootVM',
  'app/services/http',
  'app/utils/timerConfig',
  'app/services/socket'
], function (ko, rootVM, http, timerConfig, socket) {
  function VM () {
    var self = this;
    this.config = timerConfig;
    this.loading = ko.observable(false);
    this.que = {
      coinslot_id: ko.observable(0),
      total_amount: ko.observable(0),
      transaction: {},
      type: ko.observable(''),
      voucher: {},
      wait_payment_seconds: ko.observable(100)
    };
    this.koDescendantsComplete = function () {
      rootVM.showingStatusNav(false);
      rootVM.showingBanners(false);
      rootVM.showingSessionsTable(false);
    };

    //http.currentPaymentQue(function (err, q) {
    //  this.que.coinslot_id(q.coinslot_id);
    //  this.que.total_amount(q.total_amount);
    //  this.que.type(q.type);
    //  this.que.wait_payment_seconds(q.wait_payment_seconds);
    //});

    this.onPaymentReceived = function (data) {
      console.log('payment:', data);
    };
    socket.on('payment:received', this.onPaymentReceived);
  }
  return VM;
});
