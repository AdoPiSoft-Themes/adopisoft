define([
  'knockout'
], function(ko) {
  ko.components.register('start-pause-buttons', {
    viewModel: {require: 'app/components/start-pause-buttons/StartPauseButtonsVM'},
    template: {require: 'text!app/components/start-pause-buttons/start-pause-buttons.html'}
  }); 
});
