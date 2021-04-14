define([
  'knockout',
  'app/services/config',
  'app/observables/device'
], function (ko, config, device) {

  function RootVm() {
    var self = this;
    this.baseUrl = ko.observable(location.href);
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
    this.currentPage = ko.pureComputed(function () {
      if (device.is_paying()) return 'insert-coin-page';
      else return self.page();
    });
    this.showApp = function () {
      document.getElementById('loading').style.display = 'none';
      document.getElementById('app').style.display = 'block';
      try{
        window.history.replaceState('', document.title, '/');
      } catch(e) {
        //
      }
    };

  }
  return new RootVm();
});
