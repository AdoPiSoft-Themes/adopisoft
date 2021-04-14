define([
  'knockout',
  'app/services/config',
  'text!app/components/insert-coin-btn/insert-coin-btn.html'
], function(ko, config, tpl) {

  function VM() {
    this.showInsertCoinBtn = ko.observable(config.findField('buttons', 'button_insert_coin').value);
  }

  ko.components.register('insert-coin-btn', {
    viewModel: VM,
    template: tpl
  });
});
