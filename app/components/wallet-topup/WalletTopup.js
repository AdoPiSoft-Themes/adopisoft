define([
  'knockout',
  'text!app/components/wallet-topup/wallet-topup.html',
  'http',
  'toast'
], function(ko, tpl, http, toast) {

  function VM(params) {
    var self = this;
  }

  ko.components.register('wallet-topup', {
    viewModel: VM,
    template: tpl
  });

});
