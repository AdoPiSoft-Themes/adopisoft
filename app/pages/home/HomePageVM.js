define([
  'rootVM'
],
function (rootVm) {
  function HomePageVM() {
    this.koDescendantsComplete = function() {
      rootVm.showingBanners(true);
      rootVm.showingSessionsTable(true);
      rootVm.showingStatusNav(true);
    };
  }
  return HomePageVM;
});
