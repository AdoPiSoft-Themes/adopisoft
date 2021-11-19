define([
  'knockout',
  'app/services/toast',
  'core/utils/array/reduce',
  'core/utils/dom/getElementsByClassName'
],function(ko, toast, reduce, getElementsByClassName) {


  var messages = ko.observableArray([]);

  function formatText(text) {
    try {
      text = text.replace('toast.error.', '');
      text = text.replace('toast.success.', '');
      text = text.replace('toast.warning.', '');
      text = text.replaceAll('_', ' ');
    } catch(e) { console.log(e); }
    return text;
  }

  function Message(type, title, message) {
    var self = this;
    this.type = ko.observable(type);
    this.title = ko.observable(title);
    this.message = ko.observable(formatText(message));
    this.show = function () {
      messages.push(this);
      setTimeout(function () {
        self.remove();
      }, 5000);
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

  function ToastVM() {
    this.messages = messages;
    this.success = function (title, message) {
      var m = new Message('success', title, message);
      m.show();
    };
    this.error = function (title, message) {
      var m = new Message('error', title, message);
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
  }

  ko.components.register('toast', {
    viewModel: ToastVM,
    template: {require: 'text!app/components/toast/toast.html'}
  });

});
