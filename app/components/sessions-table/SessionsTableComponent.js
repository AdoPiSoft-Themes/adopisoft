define([
  'knockout'
], function(ko) {
  ko.components.register('sessions-table', {
    viewModel: {require: 'app/components/sessions-table/SessionsTableVM.js'},
    template: {require: 'text!app/components/sessions-table/sessions-table.html'}
  });
});

