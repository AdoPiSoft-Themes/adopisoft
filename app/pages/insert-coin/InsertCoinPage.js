define([
  'knockout',
  'app/pages/insert-coin/InsertCoinVM',
  'text!app/pages/insert-coin/insert-coin-page.html'
], function (ko, VM, tpl) {

  ko.components.register('insert-coin-page', {
    viewModel: VM,
    template: tpl
  });

});
