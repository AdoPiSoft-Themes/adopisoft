define([
  'knockout',
  'sessions',
  'text!app/components/sessions-table/sessions-table.html'
], function(ko, sessions, tpl) {
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
    template: tpl
  });
});

