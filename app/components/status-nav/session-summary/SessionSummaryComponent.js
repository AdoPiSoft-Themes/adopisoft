define(['knockout'], function (ko) {
  ko.components.register('session-summary', {
    viewModel: {require: 'app/components/status-nav/session-summary/SessionSummaryVM'},
    template: {require: 'text!app/components/status-nav/session-summary/session-summary.html'}
  });
});

