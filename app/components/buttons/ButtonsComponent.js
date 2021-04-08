define(['knockout'], function (ko) {
  ko.components.register('buttons', {
    viewModel: {require: 'app/components/buttons/ButtonsComponentVM'},
    template: {require: 'text!app/components/buttons/buttons-component.html'}
  });
});
