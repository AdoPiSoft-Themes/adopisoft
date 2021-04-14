define([
  'knockout'
], function(ko) {

  ko.components.register('app', {
    viewModel: {require: 'app/components/app-root/AppVM'},
    template: {require: 'text!app/components/app-root/app-root.html'}
  });

});
