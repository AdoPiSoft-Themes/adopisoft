define([
  'knockout'
], function (ko) {
  ko.components.register('home-page', {
    viewModel: { require: 'app/pages/home/HomePageVM' },
    template: { require: 'text!app/pages/home/home-page.html' }
  });
});
