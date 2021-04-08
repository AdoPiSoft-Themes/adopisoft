define(['knockout', 'app/utils/config'], function (ko, config) {

  function HeadVm() {
    this.favicon = ko.observable(config.favicon());
    this.pageTitle = ko.observable(config.pageTitle());
    this.styles = ko.observableArray(config.styles());
  }

  return new HeadVm();

});
