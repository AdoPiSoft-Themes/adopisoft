define([
  'json!../../config.json',
  'app/utils/array.reduce',
  'app/utils/array.find'
],
function (config, reduce, find) {

  function Config () {
    this.favicon = function () {
      return this.findField('page_properties', 'favicon').value;
    };
    this.pageTitle = function () {
      return this.findField('page_properties', 'page_title').value;
    };
    this.footerHtml = function () {
      return this.findField('page_properties', 'footer_content').value;
    };
    this.styles = function () {
      return this.findField('css', 'css_files').value;
    };
    this.findField = function (g_id, f_id) {
      var field = reduce(config, function(ret, field_group) {
        if (ret) return ret;
        if (field_group.field_group_id === g_id) {
          return find(field_group.fields, function(f) {
            if (f.field_id === f_id) return true;
            return false;
          });
        }
        return ret;
      }, null);
      return field;
    };
  }

  return new Config();

});
