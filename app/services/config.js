define([
  'json!/settings/portal/config.json'
],
function (config) {

  function Config () {
    this.favicon = function () {
      return this.findField('page_properties', 'favicon');
    };
    this.pageTitle = function () {
      return this.findField('page_properties', 'page_title');
    };
    this.styles = function () {
      return this.findField('css', 'css_files');
    };
    this.findField = function (g_id, f_id) {
      if (config[g_id] && config[g_id][f_id]) return config[g_id][f_id];
    };
  }

  return new Config();

});
