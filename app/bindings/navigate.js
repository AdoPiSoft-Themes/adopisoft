define(['knockout'], function(ko) {

  ko.bindingHandlers.navigate = {
    init: function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {

      var $el = $(element);

      var page =  ko.unwrap(valueAccessor()) || $el.attr('href');

      $el.on('click', function (e) {
        e.preventDefault();
        bindingContext.$root.navigate(page);
      });

    }
  };
});
