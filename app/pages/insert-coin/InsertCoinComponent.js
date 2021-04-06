define(['knockout'], function (ko) {

  ko.components.register('insert-coin', {
    viewModel: { require: 'app/pages/insert-coin/InsertCoinVM' },
    template: { require: 'text!app/pages/insert-coin/InsertCoin.html' }
  });

});
