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
    this.showingStatusNav = ko.observable(true);
    this.showingBanners = ko.observable(true);
    this.showingSessionsTable = ko.observable(true);
    this.navigate = function (page) {
      this.page(page);
    };
    this.showApp = function () {
      document.getElementById('loading').style.display = 'none';
      document.getElementById('app').style.display = 'block';
    };

  }
  return new RootVm();
});
