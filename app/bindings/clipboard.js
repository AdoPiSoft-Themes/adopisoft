define([
  'knockout',
  'clipboard',
  'translator'
], function(ko, Clipboard, translator) {

  // Usage:
  // <button data-bind="clipboard: {text: 'copy me', targetId: 'my-input-id'}">Copy</button>

  ko.bindingHandlers.clipboard = {
    init: function(element, valueAccessor) {
      var params = ko.unwrap(valueAccessor());
      var textGetter = params.text
        ? function () { return params.text; }
        : params.textGetter || undefined;
      var targetGetter = !textGetter
        ? function () { return document.getElementById(params.targetId); }
        : undefined;
      var cb = new Clipboard(element, {
        text: textGetter, target: targetGetter
      });
      cb.on('success', function() {
        element.innerText = translator.print('COPIED') + '!';
        if (params.done) params.done();
      });
      cb.on('error', function() {
        element.innerText = 'Press Ctrl+C to copy';
        if (params.done) params.done();
      });
    }
  };
});
