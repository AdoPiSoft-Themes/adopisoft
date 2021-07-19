define([
  'knockout',
  'sessions'
], function(ko, sessions) {
  ko.components.register('sessions-table', {
    viewModel: function() {
      this.sessions = sessions.get();
      this.koDescendantsComplete = function () {
        sessions.fetch();
      };
      this.dispose = function () {
        sessions.stopSync();
      };
    },
    template: {require: 'text!app/components/sessions-table/sessions-table.html'}
  });
});

