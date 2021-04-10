define([
  'knockout',
  'rootVM'
],
function (ko, rootVM) {
  function HomePageVM() {
    this.koDescendantsComplete = function() {
      rootVM.showingBanners(true);
      rootVM.showingSessionsTable(true);
      rootVM.showingStatusNav(true);
    };
  }
  return HomePageVM;
});
