define(['knockout', '../../utils/config'], function(ko) {
  ko.components.register('connection-status', {
    viewModel: {require: 'app/components/connection-status/ConnectionStatusVM.js'},
    template: {require: 'text!app/components/connection-status/connection-status.html'}
  });
});
