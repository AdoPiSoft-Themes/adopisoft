define([
  'json!../../config.json'
],
function (config) {

  function Config () {
    this.favicon = function () {
      return config.page_properties.favicon;
    };
    this.pageTitle = function () {
      return config.page_properties.page_title;
    };
    this.footerHtml = function () {
      return config.page_properties.footer_content;
    };
    this.styles = function () {
      return config.css.css_files;
    };
    this.findField = function (g_id, f_id) {
      if (config[g_id] && config[g_id][f_id]) return config[g_id][f_id];
    };
  }

  return new Config();

});
