define([
  'knockout'
],function (ko) {
  ko.components.register('modal', {
    viewModel: {require: 'app/components/modal/ModalVM'},
    template: {require: 'text!app/components/modal/modal.html'}
  });
});
