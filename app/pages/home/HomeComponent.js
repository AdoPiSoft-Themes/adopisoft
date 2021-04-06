define(['knockout', 'app/bindings/navigate'], function (ko) {

  ko.components.register('home-page', {
    viewModel: { require: 'app/pages/home/HomeComponentVM' },
    template: { require: 'text!app/pages/home/home-component.html' }
  });

});
