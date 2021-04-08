define([
  'app/utils/config'
], function (config) {
  var banner_field = config.findField('banners', 'banners');
  var slogan_field = config.findField('page_properties', 'banner_text');
  return function () {
    this.banner_text = slogan_field.value;
    this.img_urls = banner_field.value;
  };

});
