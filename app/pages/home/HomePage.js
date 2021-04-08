define([
  'knockout',
  'app/components/banners/BannersComponent',
  'app/components/sessions-table/SessionsTableComponent',
  'app/components/session-summary/SessionSummaryComponent',
  'app/components/status-nav/StatusNavComponent',
  'app/components/buttons/ButtonsComponent',
  'app/bindings/navigate'
],
function (ko) {

  ko.components.register('home-page', {
    viewModel: { require: 'app/pages/home/HomePageVM' },
    template: { require: 'text!app/pages/home/home-page.html' }
  });

});
