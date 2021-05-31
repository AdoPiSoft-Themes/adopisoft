define([
  'knockout',
  'modal',
  'app/services/config'
], function (ko, modal, config) {

  ko.components.register('banner-popup', {
    viewModel: function (params) {
      this.src = params.src;
      this.close = function () {
        modal.hide();
      };
    },
    template: '<img data-bind="attr: {src: src}" style="width: 100%;">'
  });

  var banner_field = config.findField('banners', 'banners');
  var transition_s = parseInt(config.findField('banners_transition', 'banner_interval') || 0) * 1000;
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
        }, transition_s);
      }
    };
    self.koDescendantsComplete = function () {
      if (self.imgUrls.length > 0) self.changeImage();
    };
    self.stop = function () {
      if (self._timeout) clearTimeout(self._timeout);
      self._timeout = null;
    };
    self.dispose = function () {
      self.stop();
    };
    self.showBanner = function (src) {
      modal.show('banner-popup', {
        src: src,
        full_screen: true,
        backdrop_close: true
      });
    };
  }

  ko.components.register('banners', {
    viewModel: BannersVM,
    template: {require: 'text!app/components/banners/banners.html'}
  });

});
