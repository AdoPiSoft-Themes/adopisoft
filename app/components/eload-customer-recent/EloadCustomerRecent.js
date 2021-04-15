define([
  'knockout',
  'text!app/components/eload-customer-recent/eload-customer-recent.html',
  'app/utils/formatDate',
], function(ko, tpl, formatDate) {

  function VM(params) {
    var self = this;
    var customer = params.customer() || {};
    customer.credits = customer.credits || 0;

    var last_purchase = params.last_purchase;
    if(last_purchase){
      last_purchase.created_at = formatDate(last_purchase.created_at);
    }

    self.last_purchase = ko.observable(last_purchase)
    self.customer = ko.observable(customer);
  }

  ko.components.register('eload-customer-recent', {
    viewModel: VM,
    template: tpl
  });

});
