define(['knockout', '../../utils/config', 'app/bindings/sessions'], function(ko) {
  ko.components.register('sessions', {
    viewModel: {require: 'app/components/sessions-table/SessionsTableVM.js'},
    template: {require: 'text!app/components/sessions-table/sessions-table.html'}
  });
});


