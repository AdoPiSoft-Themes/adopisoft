define(['json!../../../config.json', 'jquery'], function (config) {

  var g_banners = config.custom_fields.find(function (f) {
    return f.field_group_id === 'banners';
  });
  var banner_field = g_banners.fields[0];

  return function () {
    this.img_urls = banner_field.value;
  };

});
