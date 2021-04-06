define(['../../utils/config', '../../bindings/imageSlider'], function (config) {
  var banner_field = config.findField('banners', 'banners');
  return function () {
    this.img_urls = banner_field.value;
  };

});
