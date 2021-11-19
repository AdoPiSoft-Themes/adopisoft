define([
  'knockout',
  'core/services/config'
], function(ko, config) {
  ko.components.register('footer', {
    viewModel: function () {
      this.footer_text = config.findField('page_properties', 'footer_text');
      this.footer_url = config.findField('page_properties', 'footer_url');
    },
    template: {require: 'text!app/components/footer/footer.html'}
  });
});
