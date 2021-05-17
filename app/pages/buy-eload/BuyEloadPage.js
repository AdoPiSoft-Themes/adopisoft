define([
  'knockout'
], function (ko) {
  ko.components.register('buy-eload-page', {
    viewModel: {require: 'app/pages/buy-eload/BuyEloadVM.js'},
    template: {require: 'text!app/pages/buy-eload/buy-eload-page.html'}
  });
});
