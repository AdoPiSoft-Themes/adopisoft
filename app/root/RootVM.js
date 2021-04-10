define([
  'knockout',
  'app/utils/config'
], function (ko, config) {

  function RootVm() {
    this.favicon = ko.observable(config.favicon());
    this.pageTitle = ko.observable(config.pageTitle());
    this.styles = ko.observableArray(config.styles());
    this.footerHtml = config.footerHtml();

    this.page = ko.observable('');
    this.showingStatusNav = ko.observable(false);
    this.showingBanners = ko.observable(false);
    this.showingSessionsTable = ko.observable(false);
    this.navigate = function (page) {
      this.page(page);
    };
    this.showApp = function () {
      document.getElementById('app').style.display = 'block';
    };

  }
  return new RootVm();
});
