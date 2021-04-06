define(['knockout', '../../bindings/imageSlider'], function (ko) {

  ko.components.register('banners', {
    viewModel: { require: 'app/components/banners/BannersVM' },
    template: { require: 'text!app/components/banners/banners-component.html' }
  });

});
