define(['knockout', 'app/pages/select-coinslot/SelectCoinslotVM', 'text!app/pages/select-coinslot/select-coinslot-page.html'], function (ko, VM, tpl) {
  ko.components.register('select-coinslot-page', {
    viewModel: VM,
    template: tpl
  });
});

