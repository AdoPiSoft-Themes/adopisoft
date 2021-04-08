define(['knockout'], function (ko) {
  ko.components.register('session-summary', {
    viewModel: {require: 'app/components/session-summary/SessionSummaryVM'},
    template: {require: 'text!app/components/session-summary/session-summary.html'}
  });
});

