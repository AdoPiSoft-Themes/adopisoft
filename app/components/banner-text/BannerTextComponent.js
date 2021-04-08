define([
  'knockout'
], function (ko) {
  ko.components.register('banner-text', {
    viewModel: {require: 'app/components/banner-text/BannerTextVM'},
    template: {require: 'text!app/components/banner-text/banner-text.html'}
  });
});
