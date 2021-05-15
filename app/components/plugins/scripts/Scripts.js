define([
  'knockout',
  'app/services/plugin_assets'
], function(ko, assets) {
  ko.components.register('plugins-js', {
    viewModel: function() {
      this.portal_assets = assets;
    },
    template: {require: 'text!app/components/plugins/scripts/scripts.html'}
  });
});

