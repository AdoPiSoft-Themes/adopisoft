define(['json!../../config.json'], function (config) {

  function Config () {
    this.pageTitle = function () {
      return this.findField('page_properties', 'page_title').value;
    };
    this.styles = function () {
      return this.findField('css', 'css_files').value;
    };
    this.findField = function (g_id, f_id) {
      var field = config.reduce(function(ret, field_group) {
        if (ret) return ret;
        if (field_group.field_group_id === g_id) {
          return field_group.fields.find(function(f) {
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
