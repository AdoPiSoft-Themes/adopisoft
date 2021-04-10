define(function () {

  function _alert (message) {
    window.alert(message);
  }

  function Toast() {
    this.init = function (vm) {
      this.VM = vm;
      this.success = vm.success;
      this.error = vm.error;
    };
    this.success = _alert;
    this.error = _alert;
  } 

  return new Toast();
});
