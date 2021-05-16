define(function () {
  function Modal() {
    this.init = function (vm) {
      this.VM = vm;
      this.show = function (component, opts) {
        vm.show(component, opts);
      };
      this.hide = function() {
        vm.hide();
      };
    };
  }

  return new Modal();
});
