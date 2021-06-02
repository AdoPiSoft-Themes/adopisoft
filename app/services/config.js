define([
  'json!/settings/portal/config.json',
  'app/utils/array.map'
],
function (config, map) {

  function Config () {
    this.favicon = function () {
      return encodeURI(this.findField('page_properties', 'favicon'));
    };
    this.pageTitle = function () {
      return this.findField('page_properties', 'page_title');
    };
    this.styles = function () {
      var styles = this.findField('css', 'css_files');
      return map(styles, function (s) {
        return encodeURI(s);
      });
    };
    this.findField = function (g_id, f_id) {
      if (config[g_id] && config[g_id][f_id]) return config[g_id][f_id];
    };
  }

  return new Config();

});
