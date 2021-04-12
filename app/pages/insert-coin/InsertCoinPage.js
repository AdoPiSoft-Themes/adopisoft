define([
  'knockout',
  'app/components/progress-bar/ProgressBar',
  'app/components/seconds-format/SecondsFormat'
], function (ko) {

  ko.components.register('insert-coin-page', {
    viewModel: { require: 'app/pages/insert-coin/InsertCoinVM' },
    template: { require: 'text!app/pages/insert-coin/insert-coin-page.html' }
  });

});
