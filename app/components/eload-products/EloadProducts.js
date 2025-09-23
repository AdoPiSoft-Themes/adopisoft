define([
  'knockout',
  'http',
  'toast',
  'app/utils/array.includes'
], function(ko, http, toast, includes) {

  function VM(params) {
    var self = this;
    self.active_provider = params.active_provider;
    self.acc_number = params.acc_number;
    self.customer = params.customer;
    self.voucher = params.voucher;
    self.selected_product = params.selected_product;
    self.selected_product(null);
    self.direct_gcash = params.direct_gcash
    
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
          var desc = 'Regular Denom'
          var provider = self.active_provider();
          if (provider && (provider.name.includes('GCASH') || provider.name.includes('MAYA'))) {
            desc = provider.name
          }
          promos.push({id: denom.id, keyword: q, description: desc, price: amount + denom.topup });
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
          return includes(d.denominations, amount);
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
  }

  ko.components.register('eload-products', {
    viewModel: VM,
    template: {require: 'text!app/components/eload-products/eload-products.html'}
  });

});
