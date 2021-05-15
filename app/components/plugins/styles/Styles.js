define([
  'knockout',
  'app/services/plugin_assets'
], function(ko, assets) {
  ko.components.register('plugins-css', {
    viewModel: function() {
      this.portal_assets = assets;
    },
    template: {require: 'text!app/components/plugins/styles/styles.html'}
  });
});

