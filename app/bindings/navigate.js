define(['knockout'], function(ko) {

  ko.bindingHandlers.navigate = {
    init: function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {

      var page =  ko.unwrap(valueAccessor()) || element.getAttribute('href');
      var tagName = element.tagName.toLowerCase();
      var hasClick = allBindingsAccessor.get('click');

      element.onclick = function (e) {

        if (!hasClick) {
          if (e) {
            e.returnValue = false;
            if (e.preventDefault) e.preventDefault();
          }
        }

        if (tagName === 'a') {
          element.classList.add('disabled');
          element.innerHTML = 'Loading...';
        }
        if (tagName === 'button') {
          element.classList.add('disabled');
          element.setAttribute('disabled', 'disabled');
          element.innerHTML = 'Loading...';
        }
        bindingContext.$root.navigate(page);
        return false;
      };

    }
  };
});
