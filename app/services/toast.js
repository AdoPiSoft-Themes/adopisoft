define([
  'translator'
], function (translator) {

  function _alert (message) {
    window.alert(message);
  }

  function Toast() {
    this.init = function (vm) {
      this.VM = vm;
      this.success = function (title, text) {
        if (!text) {
          text = title;
          title = translator.print('SUCCESS');
        }
        vm.success(title, text);
      };
      this.error = function(title, text) {
        if (!text) {
          text = title;
          title = translator.print('ERROR');
        }
        vm.error(title, text);
      };
    };
    this.success = _alert;
    this.error = _alert;
  }

  return new Toast();
});
