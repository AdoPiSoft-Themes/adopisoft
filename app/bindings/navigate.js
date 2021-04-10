define(['knockout'], function(ko) {

  ko.bindingHandlers.navigate = {
    init: function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {

      var page =  ko.unwrap(valueAccessor()) || element.getAttribute('href');

      element.onclick = function (e) {
        e.preventDefault();
        bindingContext.$root.navigate(page);
      };

    }
  };
});
