define([
  'knockout',
  'rootVM',
  'socket',
  'sounds',
  'modal',
  'toast',
  'http',
  'wifiRates',
  'sessions',
  'app/utils',
  'getElementsByClassName',
  'app/services/config',
  'app/observables/payment',
  'app/observables/customer',
  'app/observables/device'
], function (ko, rootVM, socket, sounds, modal, toast, http, rates, sessions, Utils, getElementsByClassName, config, payment, customer, device) {

  ko.components.register('eload-customer-recent', {
    viewModel: function VM(params) {
      var self = this;
      var customer = params.customer() || {};
      customer.credits = customer.credits || 0;
      self.customer = customer;

      var last_purchase = params.last_purchase();
      if(last_purchase) {
        last_purchase.created_at = Utils.formatDate(last_purchase.created_at);
      }

      self.last_purchase = last_purchase;
    },
    template: {require: 'text!app/components/eload-customer-recent/eload-customer-recent.html'}
  });

  ko.components.register('eload-payment', {
    viewModel: function VM(params) {
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
    },
    template: {require: 'text!app/components/eload-payment/eload-payment.html'}
  });

  ko.components.register('eload-processing', {
    viewModel: function VM(params) {
      var loader_icon = '<img src="/uploads/img/preloader.gif" style="width: 20px;margin: 10px;"/>';
      var self = this;
      self.account_number = ko.observable(params.account_number);
      self.title = ko.observable('Submitting Request');
      self.message = ko.observable('Please wait ...' + loader_icon);
      self.allow_retry = ko.observable(false);
      self.status = ko.observable('');

      self.close = function() {
        params.close();
        rootVM.navigate('buy-eload-page');
      };
      self.retry = self.close;

      setTimeout(function() {
        if(!self.status() || self.status() === 'queued') {
          self.allow_retry(true);
          sounds.eload_queued.play();
        }
      }, 15000);

      sounds.eload_processing.play();
      self.onEloadStatus = function(data) {
        var message = data.message;
        if(data.status === 'failed') {
          sounds.eload_failed.play();
          self.allow_retry(false);
        }else if(data.status === 'succeed') {
          sounds.eload_successful.play();
          self.allow_retry(false);
        }else if(data.status === 'queued') {
          message += loader_icon;
        }

        self.status(data.status);
        self.title(data.title);
        self.message(message);
        self.account_number(data.acc_number);
      };

      socket().on('eload:status', self.onEloadStatus);

      self.dispose = function () {
        socket().removeListener('eload:status', self.onEloadStatus);
      };
    },
    template: {require: 'text!app/components/eload-processing/eload-processing.html'}
  });

  ko.components.register('eload-products', {
    viewModel:   function VM(params) {
      var self = this;
      self.active_provider = params.active_provider;
      self.acc_number = params.acc_number;
      self.customer = params.customer;
      self.voucher = params.voucher;
      self.selected_product = params.selected_product;
      self.selected_product(null);

      self.promos = ko.observableArray([]);
      self.regular_denoms = ko.observableArray([]);
      self.amounts = ko.observableArray([]);
      self.has_more_promos = ko.observable(false);
      self.is_voucher = ko.observable(false);
      self.page = ko.observable(1);
      self.has_search = ko.observable(true);
      self.supports_regular_denom = ko.observable(false);
      self.loading_products = ko.observable(false);
      self.activating_voucher = ko.observable(false);
      self.min_regular_load = ko.observable(0);
      self.max_regular_load = ko.observable(0);
      self.search_entry = ko.observable('');

      self.koDescendantsComplete = function () {
        self.promos([]);
        self.regular_denoms([]);
        var provider = self.active_provider();
        if(!provider) return;
        self.loading_products(true);
        http.getEloadPromos({provider_id: provider.id}, function(err, data) {
          self.promos(data.promos);
          self.has_more_promos(data.has_more_promos);
          self.page(data.page);
          self.has_search(data.promos_count > data.per_page);
          self.supports_regular_denom(false);
          self.regular_denoms([]);

          http.getRegularDenoms(provider.id, function(err, data) {
            self.loading_products(false);

            if(err) {
              return toast.error(err.responseText);
            }
            data = data || [];
            if(data.length <= 0) return;

            self.supports_regular_denom(true);
            self.has_search(true);

            var amounts = [];
            for(var i = 0; i < data.length; i++) {
              amounts = amounts.concat(data[i].denominations);
            }
            amounts = amounts.sort(function(a, b) {
              return a - b;
            });

            self.amounts(amounts);
            self.regular_denoms(data);
            self.min_regular_load(amounts[0]);
            self.max_regular_load(amounts[amounts.length - 1]);
          });
        });
      };

      self.search_entry.subscribe(function(q) {
        return self.searchProducts(q);
      });

      self.loadMorePromos = function(page) {
        var provider_id = self.active_provider().id;
        self.has_more_promos(false);
        var q = self.search_entry();
        return http.getEloadPromos({provider_id: provider_id, page: page + 1, q: q, search: q}, function(err, data) {
          if(err) {
            return toast.error(err.responseText);
          }

          data = data || {};
          self.page(data.page);
          self.has_more_promos(data.has_more_promos);
          var promos = self.promos();
          for(var i = 0; i < data.promos.length; i++) {
            promos.push(data.promos[i]);
          }
          self.promos(promos);
        });
      };

      self.searchProducts = function(q) {
        var provider_id = self.active_provider().id;
        var promos = [];
        self.promos(promos);
        self.has_more_promos(false);
        self.is_voucher(false);
        self.page(1);

        if(!isNaN(q)) {
          var amount = parseInt(q);
          var denom = self.findRegularDenom(amount);
          if(denom) {
            promos.push({id: denom.id, keyword: q, description: 'Regular Load', price: amount + denom.topup });
          }
        }

        self.loading_products(true);
        return http.getEloadPromos({provider_id: provider_id, q: q, search: q}, function(err, data) {
          self.loading_products(false);
          if(err) {
            return toast.error(err.responseText);
          }

          data = data || {};

          for(var i = 0; i < data.promos.length; i++) {
            promos.push(data.promos[i]);
          }
          var is_voucher = promos.length <= 0 && q && q.length >= 6 && self.supports_regular_denom(); // eload voucher is for regular load only for now
          self.promos(promos);
          self.has_more_promos(data.has_more_promos);
          self.is_voucher(is_voucher);

        });
      };

      self.findRegularDenom = function(amount) {
        var available_denoms = self.regular_denoms() || [];
        return available_denoms.find(function(d) {
          if(d.type === 'range') {
            return d.denominations[0] <= amount && d.denominations[1] >= amount;
          }else{
            return Utils.array.includes(d.denominations, amount);
          }
        });
      };

      self.activateVoucher = function() {
        var code = self.search_entry();
        if(!code) return;
        if(self.activating_voucher()) return false;
        self.activating_voucher(true);
        var acc_number = self.acc_number();
        http.activateEloadVoucher(acc_number, code, function(err, data) {
          self.activating_voucher(false);
          if(err) {
            var msg = JSON.parse(err.responseText);
            return toast.error(msg.error);
          }

          self.search_entry('');
          var customer = data.customer;
          var voucher = data.voucher;
          toast.success('Voucher successfully activated');

          var selected_product = {
            keyword: voucher.eload_amount, description: 'Regular Load', price: voucher.price
          };
          self.customer(customer);
          self.selected_product(selected_product);
          self.voucher(voucher);
        });
      };

      self.selectProduct = function(product) {
        self.selected_product(product);
      };
    },
    template: {require: 'text!app/components/eload-products/eload-products.html'}
  });

  ko.components.register('eload-providers', {
    viewModel: function VM(params) {
      var self = this;
      self.logo_urls = {
        Globe: '/public/eload-logos/globe-logo.png',
        SMART: '/public/eload-logos/smart-logo.png',
        SUN: '/public/eload-logos/sun-logo.png',
        TNT: '/public/eload-logos/tnt-logo.png',
        TM: '/public/eload-logos/tm-logo.png',
        DITO: '/public/eload-logos/dito-logo.png',
        CIGNAL: '/public/eload-logos/cignal-logo.png',
        GSAT: '/public/eload-logos/gsat-logo.png',
        MERALCO: '/public/eload-logos/meralco-prepaid-logo.png',
        'SKY CABLE': '/public/eload-logos/sky-direct-logo.png',
        'CHERRY PREPA.': '/public/eload-logos/cherry-prepaid-logo.png',
        'CHERRY PREPAID': '/public/eload-logos/cherry-prepaid-logo.png',
        'GCASH CASH-IN': '/public/eload-logos/gcash_cash_in_logo.png'
      };

      self.logoUrl = function(p) {
        p = p || '';
        return self.logo_urls[p] || self.logo_urls[p.toUpperCase()];
      };
      self.active_provider = params.active_provider;
      self.providers = params.providers;

      self.selectProvider = function(provider) {
        self.active_provider(null);
        self.active_provider(provider);
      };
    },
    template: {require: 'text!app/components/eload-providers/eload-providers.html'}
  });

  ko.components.register('eload-to-pay', {
    viewModel: function VM(params) {
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
      self.submitting = ko.observable(false);

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
        self.submitting(true);
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

      self.formatDate = Utils.formatDate;

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
    },
    template: {require: 'text!app/components/eload-to-pay/eload-to-pay.html'}
  });

  ko.components.register('wallet-prompt', {
    viewModel: {require: 'app/components/wallet-prompt/WalletPromptVM'},
    template: {require: 'text!app/components/wallet-prompt/wallet-prompt.html'}
  });

  ko.components.register('wallet-topup', {
    viewModel: function VM(params) {
      var self = this;
      self.loading = params.loading;
      self.que = params.que;
      self.rates = params.rates;
      self.hasPayment = params.hasPayment;
      self.donePayment = params.donePayment;
    },
    template: {require: 'text!app/components/wallet-topup/wallet-topup.html'}
  });

});
