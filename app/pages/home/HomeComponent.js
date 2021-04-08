define([
  'knockout',
  'app/components/banners/BannersComponent',
  'app/components/sessions/SessionsComponent',
  'app/components/connection-status/ConnectionStatusComponent',
  'app/components/buttons/ButtonsComponent',
  'app/bindings/navigate'
],
function (ko) {

  ko.components.register('home-page', {
    viewModel: { require: 'app/pages/home/HomeComponentVM' },
    template: { require: 'text!app/pages/home/home-page.html' }
  });

});
