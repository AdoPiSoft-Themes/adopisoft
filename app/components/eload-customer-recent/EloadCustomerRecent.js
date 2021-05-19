define([
  'knockout',
  'app/utils/formatDate'
], function(ko, formatDate) {

  function VM(params) {
    var self = this;
    var customer = params.customer() || {};
    customer.credits = customer.credits || 0;
    self.customer = customer;

    var last_purchase = params.last_purchase();
    if(last_purchase) {
      last_purchase.created_at = formatDate(last_purchase.created_at);
    }

    self.last_purchase = last_purchase;
  }

  ko.components.register('eload-customer-recent', {
    viewModel: VM,
    template: {require: 'text!app/components/eload-customer-recent/eload-customer-recent.html'}
  });

});
