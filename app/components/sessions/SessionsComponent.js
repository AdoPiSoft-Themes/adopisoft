define(['knockout', '../../utils/config', 'app/bindings/sessions'], function(ko) {
  ko.components.register('sessions', {
    viewModel: {require: 'app/components/sessions/SessionsVM.js'},
    template: {require: 'text!app/components/sessions/SessionsComponent.html'}
  });
});


