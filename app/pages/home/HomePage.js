define([
  'knockout',
  'rootVM'
], function (ko, rootVM) {
  ko.components.register('home-page', {
    viewModel: function () {
      this.koDescendantsComplete = function() {
        rootVM.showingBanners(true);
        rootVM.showingSessionsTable(true);
        rootVM.showingStatusNav(true);
      };
    },
    template: { require: 'text!app/pages/home/home-page.html' }
  });
});
