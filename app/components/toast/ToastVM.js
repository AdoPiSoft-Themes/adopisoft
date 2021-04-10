define([
  'knockout',
  'toast',
  'app/utils/array.reduce'
],function(ko, toast, reduce) {

  var messages = ko.observableArray([]);

  function Message(type, message) {
    var self = this;
    this.type = ko.observable(type);
    this.message = ko.observable(message);
    this.show = function () {
      messages.push(this);
      setTimeout(function () {
        self.remove();
      }, 3000);
    };
    this.remove = function () {
      messages.remove(self); 
    };
  }

  return function ToastVM() {
    this.messages = messages;
    this.success = function (message) {
      var m = new Message('success', message);
      m.show();
    };
    this.error = function (message) {
      var m = new Message('error', message);
      m.show();
    };
    this.showToast = function (element, index) {
      var toasts = document.getElementsByClassName('toast');
      var el = toasts[index];
      var totalHeight = reduce(toasts, function (sum, t) {
        return sum + t.offsetHeight + (index === 0 ? 15 : 0);
      }, 0) - el.offsetHeight;
      el.style.top = totalHeight + 'px';
    };
    toast.init(this);
  };

});
