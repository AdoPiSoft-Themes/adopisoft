define([
  'app/services/config'
], function(config) {
  return function () {
    this.bannerText = config.findField('page_properties', 'banner_text');
  };
});
