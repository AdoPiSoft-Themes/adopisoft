define([
  'knockout',
  'app/services/config'
], function (ko, config) {

  this.showViewRatesBtn = ko.observable(config.findField('buttons', 'button_view_rates'));
  this.showMoreBtn = ko.observable(config.findField('buttons', 'more_button'));

  ko.components.register('home-page', {
    viewModel: { require: 'app/pages/home/HomePageVM' },
    template: { require: 'text!app/pages/home/home-page.html' }
  });
});
