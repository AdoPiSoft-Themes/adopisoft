define([
  'knockout',
  'rootVM',
  'app/observables/customer'
], function (ko, rootVM, customer) {
  ko.components.register('user-account', {
    viewModel: function () {
      var self = this;
      self.customer = customer
      self.koDescendantsComplete = function () {
        customer.fetch(function () {});
      }
      
    },
    template: {require: 'text!app/components/user-account/user-account.html' }

  })
})