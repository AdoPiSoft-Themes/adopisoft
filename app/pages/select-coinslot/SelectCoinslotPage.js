define(['knockout'], function (ko) {
  ko.components.register('select-coinslot-page', {
    viewModel: {require: 'app/pages/select-coinslot/SelectCoinslotVM.js'},
    template: {require: 'text!app/pages/select-coinslot/select-coinslot-page.html'}
  });
});

