define([
  'knockout',
  'rootVM',
  'app/utils/config'
],
function (ko, rootVM, config) {
  function HomePageVM() {
    this.showInsertCoinBtn = ko.observable(config.findField('buttons', 'button_insert_coin').value);
    this.koDescendantsComplete = function() {
      rootVM.showingBanners(true);
      rootVM.showingSessionsTable(true);
      rootVM.showingStatusNav(true);
    };
  }
  return HomePageVM;
});
