define([
  'knockout',
  'redirect',
  'app/utils/addClass'
], function(ko, redirect, addClass) {

  ko.bindingHandlers.navigate = {
    init: function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {

      var page =  ko.unwrap(valueAccessor()) || element.getAttribute('href');
      var tagName = element.tagName.toLowerCase();
      var hasClick = allBindingsAccessor.get('click');

      element.onclick = function (e) {
        redirect.cancel();
        if (!hasClick) {
          if (e) {
            e.returnValue = false;
            if (e.preventDefault) e.preventDefault();
          }
        }
        if (tagName === 'a') {
          addClass(element, 'disabled');
          element.innerHTML = 'Loading...';
        }
        if (tagName === 'button') {
          addClass(element, 'disabled');
          element.setAttribute('disabled', 'disabled');
          element.innerHTML = 'Loading...';
        }
        bindingContext.$root.navigate(page);
        return false;
      };

    }
  };
});
