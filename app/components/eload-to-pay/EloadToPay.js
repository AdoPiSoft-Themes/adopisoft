define([
  'knockout',
  'text!app/components/eload-to-pay/eload-to-pay.html',
  'app/utils/formatDate',
  'http',
  'toast'
], function(ko, tpl, formatDate, http, toast) {

  function VM(params) {
    var self = this;
    self.active_provider = params.active_provider;
    self.customer = params.customer;
    self.voucher = params.voucher;
    self.selected_product = params.selected_product;
    self.product = params.selected_product();
    self.acc_number = params.acc_number();
    self.related_txn = ko.observable(false);
    self.voucher_code = ko.observable("");
    self.back = function(){
      self.selected_product(null);
    }

    self.calcToPay = function(){
      var customer = self.customer() || {}
      var credits = self.customer.credits || 0;
      return Math.max(0, self.product.price - credits).toFixed(2);
    }

    self.confirmPurchase = function(){
    }

    var activatingVoucher = false;
    self.activateVoucher = function(){
      if(activatingVoucher) return false;
      activatingVoucher = true;

      http.activateEloadVoucher(self.acc_number, self.voucher_code(), function(err, data){
        activatingVoucher = false;

        if(err){
          var msg = JSON.parse(err.responseText)
          return toast.error(msg.error);
        }

        toast.success("Voucher successfully activated");

        self.voucher_code("");
        self.customer(data.customer)
      })
    }

    self.formatDate = formatDate;
  }

  ko.components.register('eload-to-pay', {
    viewModel: VM,
    template: tpl
  });

});
