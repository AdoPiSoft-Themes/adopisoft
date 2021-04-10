define([
  'knockout',
  'app/components/toast/ToastComponent',
  'app/components/status-nav/StatusNavComponent',
  'app/components/banners/BannersComponent',
  'app/components/status-nav/StatusNavComponent',
  'app/components/sessions-table/SessionsTableComponent'
], function(ko) {

  ko.components.register('app', {
    viewModel: {require: 'app/components/app-root/AppVM'},
    template: {require: 'text!app/components/app-root/app-root.html'}
  });

});
