define([
  'knockout',
  './connection-status/ConnectionStatusComponent',
  './session-summary/SessionSummaryComponent',
], function(ko) {
  ko.components.register('status-nav', {
    viewModel: {require: 'app/components/status-nav/StatusNavVM'},
    template: {require: 'text!app/components/status-nav/status-nav.html'}
  });
});
