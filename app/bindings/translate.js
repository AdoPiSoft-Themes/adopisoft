define(['knockout', 'translator'], function(ko, translator) {
  ko.bindingHandlers.translate = {
    init: function (element, valueAccessor) {
      var args = ko.unwrap(valueAccessor());
      var translated = typeof args === 'string' ? [args] : args
      element.innerHTML = translator.print(translated);
    }
  }
})
