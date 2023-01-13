define([
  'knockout',
  'app/services/config',
  'text!app/components/footer/footer.html'
], function(ko, config, tpl) {
  ko.components.register('footer', {
    viewModel: function () {
      this.footer_text = config.findField('page_properties', 'footer_text');
      this.footer_url = config.findField('page_properties', 'footer_url');
    },
    template: tpl
  });
});
