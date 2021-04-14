define([
  'knockout'
], function(ko) {
  ko.components.register('receipt-page', {
    viewModel: {require: 'app/pages/receipt-page/ReceiptPageVM'},
    template: {require: 'text!app/pages/receipt-page/receipt-page.html'}
  });
});
