define(['knockout'], function (ko) {

  ko.components.register('home-page', {
    viewModel: { require: 'app/components/home/viewModel' },
    template: { require: 'text!app/components/home/home-component.html' }
  });

});
