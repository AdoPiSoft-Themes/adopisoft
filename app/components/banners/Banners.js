define([
  'knockout',
  'sounds',
  'app/services/config',
  'app/utils/array.map',
  'text!app/components/banners/banners.html'
], function (ko, sounds, config, map, tpl) {

  var banner_field = config.findField('banners', 'banners');
  var slogan_field = config.findField('page_properties', 'banner_text');
  var transition_s = parseInt(config.findField('banners_transition', 'banner_interval') || 0) * 1000;

  function BannersVM () {
    var self = this;
    var index = 0;
    self.src = ko.observable('');
    self.bannerText = slogan_field;
    self.imgUrls = map(banner_field, function (url) {
      return encodeURI(url);
    });
    self.changeImage = function () {
      if (index === self.imgUrls.length) index = 0;
      self.src(self.imgUrls[index]);
      index++;
      if (self.imgUrls.length > 1) {
        self._timeout = setTimeout(function () {
          self.changeImage();
        }, transition_s);
      }
    };
    self.koDescendantsComplete = function () {
      if (self.imgUrls.length > 0) self.changeImage();
      sounds.background.play();
    };
    self.dispose = function () {
      if (self._timeout) clearTimeout(self._timeout);
      self._timeout = null;
      sounds.background.stop();
    };
  }

  ko.components.register('banners', {
    viewModel: BannersVM,
    template: tpl
  });

});
