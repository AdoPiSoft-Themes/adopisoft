define(function () {

  function _alert (message) {
    window.alert(message);
  }

  function Toast() {
    this.init = function (vm) {
      this.VM = vm;
      this.success = function (title, text) {
        if (!text) {
          text = title;
          title = 'Success';
        }
        vm.success(title, text);
      };
      this.error = function(title, text) {
        if (!text) {
          text = title;
          title = 'Error';
        }
        vm.error(title, text);
      };
    };
    this.success = _alert;
    this.error = _alert;
  }

  return new Toast();
});
