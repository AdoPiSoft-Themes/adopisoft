define([
  'knockout'
],function (ko) {
  ko.components.register('toast', {
    viewModel: {require: 'app/components/toast/ToastVM'},
    template: {require: 'text!app/components/toast/toast.html'}
  });
});
