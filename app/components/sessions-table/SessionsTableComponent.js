define([
  'knockout',
  'sessions'
], function(ko, sessions) {
  ko.components.register('sessions-table', {
    viewModel: function() {
      this.sessions = sessions.get();
    },
    template: {require: 'text!app/components/sessions-table/sessions-table.html'}
  });
});

