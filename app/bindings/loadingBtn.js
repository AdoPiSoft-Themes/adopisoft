define([
  'knockout',
  'app/utils/addClass',
  'app/utils/removeClass'
], function(ko, addClass, removeClass) {

  window._loadingTpls = window._loadingTpls || {};
  
  ko.bindingHandlers.loadingBtn = {
    update: function(element, valueAccessor) {

      var name = element.getAttribute('data-loading-btn-id');
      if (!name) {
        name = Math.random().toString();
        element.setAttribute('data-loading-btn-id', name);
      }
      var loading = ko.unwrap(valueAccessor()); 
      var tagName = element.tagName.toLowerCase();
      window._loadingTpls[name] = window._loadingTpls[name] || element.innerHTML;

      if (loading) {
        if (tagName === 'button' || tagName === 'a') {
          element.setAttribute('disabled', 'disabled');
          addClass(element, 'disabled');
        }
        element.innerHTML = 'Loading...';
      } else {
        if (tagName === 'button' || tagName === 'a') {
          element.removeAttribute('disabled');
          removeClass(element, 'disabled');
        }
        element.innerHTML = window._loadingTpls[name];
      }
    } 
  };
});
