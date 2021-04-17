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
    self.active_provider_id = params.active_provider().id;
    self.customer = params.customer;
    self.voucher = params.voucher;
    self.selected_product = params.selected_product;
    self.product = params.selected_product();
    self.acc_number = params.acc_number();
    self.related_txn = ko.observable(false);
    self.is_provider_available = ko.observable(false);
    self.checking_provider = ko.observable(true);
    self.checking_related_txn = ko.observable(true);
    self.activating_voucher = ko.observable(false);

    self.voucher_code = ko.observable("");
    self.back = function(){
      self.selected_product(null);
    }

    self.calcToPay = function(){
      var customer = self.customer() || {}
      var credits = customer.credits || 0;
      return Math.max(0, self.product.price - credits).toFixed(2);
    }

    self.confirmPurchase = function(){
    }

    self.activateVoucher = function(){
      if(self.activating_voucher()) return false;
      self.activating_voucher(true);
      http.activateEloadVoucher(self.acc_number, self.voucher_code(), function(err, data){
        self.activating_voucher(false);

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

    self.koDescendantsComplete = function () {
      http.checkEloadProvider(self.active_provider_id, function(err, data){
        self.checking_provider(false);

        http.getRelatedTxn(self.acc_number, self.product.keyword, function(err, data2){
          self.checking_related_txn(false);
          self.related_txn((data || {}).related_txn);
        })
        self.is_provider_available(!err);
      })
    }
  }

  ko.components.register('eload-to-pay', {
    viewModel: VM,
    template: tpl
  });

});
