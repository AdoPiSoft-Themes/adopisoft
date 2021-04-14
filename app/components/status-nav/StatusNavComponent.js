define([
  'knockout',
  './connection-status/ConnectionStatusComponent',
  './session-summary/SessionSummaryComponent'
], function(ko) {
  ko.components.register('status-nav', {
    viewModel: function () {},
    template: {require: 'text!app/components/status-nav/status-nav.html'}
  });
});
