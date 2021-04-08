define([
  'knockout',
  'app/components/connection-status/ConnectionStatusComponent',
  'app/components/session-summary/SessionSummaryComponent',
], function(ko) {
  ko.components.register('status-nav', {
    viewModel: {require: 'app/components/status-nav/StatusNavVM'},
    template: {require: 'text!app/components/status-nav/status-nav.html'}
  });
});
