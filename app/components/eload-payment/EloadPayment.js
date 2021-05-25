define([
  'rootVM',
  'knockout',
  'app/observables/device',
  'http',
  'toast',
  'socket',
  'modal',
  'app/components/eload-processing/EloadProcessing'
], function(rootVM, ko, device, http, toast, socket, modal) {

  function VM(params) {
    var self = this;
    self.que = params.que;
    self.donePayment = params.donePayment;
    self.hasPayment = params.hasPayment;

    self.calcEloadPayable = ko.pureComputed(function() {
      var que = self.que;
      return Math.max(que.eload_price() - que.customer_credits(), 0).toFixed(2);
    });

    self.cancelEloadPayment = function() {
      http.donePayment(self.que.coinslot_id(), function() {
        device.is_paying(false);
        rootVM.navigate('buy-eload-page');
      });
    };

    self.handleFullyPaidEload = function(data) {
      if(data && data.type !== 'eload') return;
      var is_paid = data.eload_price - data.customer_credits <= 0;
      if(is_paid) {
        http.donePayment(data.coinslot_id, function(err) {
          if(!err) {
            modal.show('eload-processing', {account_number: self.que.account_number(), product_keyword: self.que.product_keyword()});
          }
        });
      }
    };

    socket().on('payment:received', self.handleFullyPaidEload);

    self.dispose = function () {
      socket().removeListener('payment:received', self.handleFullyPaidEload);
    };
  }

  ko.components.register('eload-payment', {
    viewModel: VM,
    template: {require: 'text!app/components/eload-payment/eload-payment.html'}
  });

});
