define([
  'knockout',
  'app/services/config'
], function (ko, config) {

  var banner_field = config.findField('banners', 'banners');
  var slogan_field = config.findField('page_properties', 'banner_text');

  function BannersVM () {
    var self = this;
    var index = 0;
    self.src = ko.observable('');
    self.bannerText = slogan_field;
    self.imgUrls = banner_field;
    self.changeImage = function () {
      if (index === self.imgUrls.length) index = 0;
      self.src(self.imgUrls[index]);
      index++;
      if (self.imgUrls.length > 1) {
        self._timeout = setTimeout(function () {
          self.changeImage();
        }, 3000);
      }
    };
    self.koDescendantsComplete = function () {
      if (self.imgUrls.length > 0) self.changeImage();
    };
    self.dispose = function () {
      if (self._timeout) clearTimeout(self._timeout);
      self._timeout = null;
    };
  }

  ko.components.register('banners', {
    viewModel: BannersVM,
    template: {require: 'text!app/components/banners/banners.html'}
  });

});
