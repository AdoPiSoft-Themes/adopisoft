define(['knockout'], function (ko) {

  ko.components.register('insert-coin', {
    viewModel: { require: 'app/components/insert-coin/InsertCoinVM' },
    template: { require: 'text!app/components/insert-coin/InsertCoin.html' }
  });

});
