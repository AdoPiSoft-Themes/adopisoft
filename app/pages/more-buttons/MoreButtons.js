define([
  'knockout',
  'app/utils/config'
], function(ko, config) {
  ko.components.register('more-buttons', {
    viewModel: function () {
      this.config = config;
    },
    template: {require: 'text!app/pages/more-buttons/more-buttons.html'}
  });
});
