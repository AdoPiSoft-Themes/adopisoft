define(['knockout'], function(ko) {
  ko.components.register('connection-status', {
    viewModel: {require: 'app/components/status-nav/connection-status/ConnectionStatusVM.js'},
    template: {require: 'text!app/components/status-nav/connection-status/connection-status.html'}
  });
});
