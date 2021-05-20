define([
  'knockout',
  'rootVM',
  'app/utils/formatDate',
  'app/observables/payment',
  'http',
  'toast',
  'modal',
  'app/components/eload-processing/EloadProcessing'
], function(ko, rootVM, formatDate, payment, http, toast, modal) {

  function VM(params) {
    var self = this;
    self.active_provider = params.active_provider;
    self.active_provider_id = params.active_provider().id;
    self.customer = params.customer;
    self.selected_product = params.selected_product;
    self.voucher = params.voucher();
    self.product = params.selected_product();
    self.acc_number = params.acc_number();
    self.related_txn = ko.observable(null);
    self.is_provider_available = ko.observable(false);
    self.checking_provider = ko.observable(true);
    self.checking_related_txn = ko.observable(true);
    self.activating_voucher = ko.observable(false);
    self.error_msg = ko.observable('');

    self.voucher_code = ko.observable('');
    self.back = function() {
      self.selected_product(null);
    };

    self.calcToPay = function() {
      var dupTxn = self.related_txn();
      if(dupTxn && dupTxn.is_paid) {
        return 0;
      }

      var customer = self.customer() || {};
      var credits = customer.credits || 0;
      return Math.max(0, self.product.price - credits).toFixed(2);
    };

    self.confirmPurchase = function() {

      var provider_id = self.active_provider_id;
      var product = self.product;
      var related_txn = self.related_txn;
      var voucher = self.voucher;

      if(!product.type || product.type !== 'regular') {
        product.type = 'promo';
      }
      
      var voucher_id = (voucher || {}).id;
      var toPay = self.calcToPay();

      payment.eloadOptions({
        provider_id: provider_id,
        account_number: self.acc_number,
        product_keyword: product.keyword
      });

      if((related_txn && related_txn.is_paid) || toPay <= 0) {
        http.purchaseLoad(self.acc_number, provider_id, product.keyword, voucher_id, function(err) {
          if(!err) {
            rootVM.navigate('home-page');
            modal.show('eload-processing', {account_number: self.acc_number, product_keyword: product.keyword});
          }
        });
      }else if(toPay > 0) {
        payment.intent('eload');
        payment.rateType('eload');
        payment.isVoucher(false);
        rootVM.navigate('select-coinslot-page');
      }
    };

    self.activateVoucher = function() {
      if(self.activating_voucher()) return false;
      self.activating_voucher(true);
      http.activateEloadVoucher(self.acc_number, self.voucher_code(), function(err, data) {
        self.activating_voucher(false);

        if(err) {
          var msg = JSON.parse(err.responseText);
          return toast.error(msg.error);
        }

        toast.success('Voucher successfully activated');

        self.voucher_code('');
        self.customer(data.customer);
      });
    };

    self.formatDate = formatDate;

    self.koDescendantsComplete = function () {
      http.checkEloadProvider(self.active_provider_id, self.product.keyword, function(err) {
        self.checking_provider(false);

        http.getRelatedTxn(self.acc_number, self.product.keyword, function(err, data2) {
          self.checking_related_txn(false);
          self.related_txn((data2 || {}).related_txn);
        });

        self.is_provider_available(!err);
        if(err) {
          self.error_msg(err.response.replaceAll('"', ''));
        }
      });
    };
  }

  ko.components.register('eload-to-pay', {
    viewModel: VM,
    template: {require: 'text!app/components/eload-to-pay/eload-to-pay.html'}
  });

});

