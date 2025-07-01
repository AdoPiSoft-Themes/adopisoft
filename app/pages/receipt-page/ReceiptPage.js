define([
  'knockout',
  'app/pages/receipt-page/ReceiptPageVM',
  'text!app/pages/receipt-page/receipt-page.html'
], function(ko, VM, tpl) {
  ko.components.register('receipt-page', {
    viewModel: VM,
    template: tpl
  });
});
