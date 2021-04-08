define([
  'knockout',
  'app/components/banners/BannersComponent',
  'app/components/banner-text/BannerTextComponent',
  'app/components/buttons/ButtonsComponent',
  'app/components/status-nav/StatusNavComponent',
  'app/components/sessions-table/SessionsTableComponent'
], function (ko) {
  ko.components.register('home-page', {
    viewModel: { require: 'app/pages/home/HomePageVM' },
    template: { require: 'text!app/pages/home/home-page.html' }
  });
});
