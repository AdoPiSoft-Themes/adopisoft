define([
  'knockout',
  'toast',
  'app/utils/array.reduce',
  'getElementsByClassName'
],function(ko, toast, reduce, getElementsByClassName) {

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

  function applyToastStyles(el) {
    el.style.zIndex = 999999;
    el.style.position = 'fixed';
    el.style.bottom = '0';
    el.style.right = '15px';
    el.style.width = '100%';
    el.style.maxWidth = '300px';
    el.style.paddingLeft = '30px';
    el.style.paddingRight = '30px';
  }

  function findToasts() {
    try {
      var toasts = document.getElementsByClassName('toast');
      return toasts;
    } catch(e) {
      var toastsCon = document.getElementById('toasts');
      return getElementsByClassName('toast', '*', toastsCon);
    }
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
      var toasts = findToasts();
      var el = toasts[index];
      applyToastStyles(el);
      var totalHeight = reduce(toasts, function (sum, t) {
        return sum + t.offsetHeight;
      }, 0) - el.offsetHeight;
      el.style.bottom = totalHeight + 'px';
    };
    toast.init(this);
  };

});
