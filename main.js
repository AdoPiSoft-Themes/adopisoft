define('main', [
  'knockout',
  'rootVM',
  'domready',
  'app/init',
  'translator',
  'app/bindings/main',
  'app/pages/main',
  'app/services/config',
  'app/components/app-root/AppComponent'
], function(ko, rootVM, domready, init, translator) {
  function onLoad() {
    translator.init(function () {
      init(function () {
        var headEl = document.getElementsByTagName('head')[0];
        var bodyEl = document.getElementsByTagName('body')[0];
        ko.applyBindings(rootVM, headEl);
        ko.applyBindings(rootVM, bodyEl);
      });
    });
  }
  domready(onLoad);
}, function(err) {
  var failedId = err.requireModules && err.requireModules[0];
  if (failedId === 'json!/settings/portal/config.json' || failedId === 'json!/client/plugins/assets.json') {
    window.location.reload();
  }
});
