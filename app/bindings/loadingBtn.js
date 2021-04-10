define(['knockout'], function(ko) {

  window._loadingTpls = window._loadingTpls || {};
  
  ko.bindingHandlers.loadingBtn = {
    update: function(element, valueAccessor) {

      var name = element.getAttribute('id');
      if (!name) throw new Error('`loadingBtn` binding needs `id` attribute.');
      var loading = ko.unwrap(valueAccessor()); 
      var tagName = element.tagName.toLowerCase();
      window._loadingTpls[name] = window._loadingTpls[name] || element.innerHTML;

      if (loading) {
        if (tagName === 'button' || tagName === 'a') {
          element.setAttribute('disabled', 'disabled');
          element.classList.add('disabled');
        }
        element.innerHTML = 'Loading...';
      } else {
        if (tagName === 'button' || tagName === 'a') {
          element.removeAttribute('disabled');
          element.classList.remove('disabled');
        }
        element.innerHTML = window._loadingTpls[name];
      }
    } 
  };
});
