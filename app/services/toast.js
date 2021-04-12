define(function () {

  function _alert (message) {
    window.alert(message);
  }

  function Toast() {
    this.init = function (vm) {
      this.VM = vm;
      this.success = function (m) {
        vm.success(m);
      };
      this.error = function(m) {
        vm.error(m);
      };
    };
    this.success = _alert;
    this.error = _alert;
  }

  return new Toast();
});
