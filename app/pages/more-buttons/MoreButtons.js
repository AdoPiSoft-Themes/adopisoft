define([
  'knockout',
  'rootVM',
  'app/services/config'
], function(ko, rootVM, config) {
  ko.components.register('more-buttons', {
    viewModel: function () {
      this.config = config;
      this.koDescendantsComplete = function () {
        rootVM.showingStatusNav(true);
        rootVM.showingBanners(true);
        rootVM.showingSessionsTable(true);
      };
    },
    template: {require: 'text!app/pages/more-buttons/more-buttons.html'}
  });
});
