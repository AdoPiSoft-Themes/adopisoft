define([
  'knockout',
  'clipboard',
  'redirect',
  'app/utils'
], function(ko, Clipboard, redirect, Utils) {

  // clipboard
  ko.bindingHandlers.clipboard = {
    // Usage:
    // <button data-bind="clipboard: {text: 'copy me', targetId: 'my-input-id'}">Copy</button>
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
        element.innerText = 'Copied!';
        if (params.done) params.done();
      });
      cb.on('error', function() {
        element.innerText = 'Press Ctrl+C to copy';
        if (params.done) params.done();
      });
    }
  };

  //navigate
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
          Utils.addClass(element, 'disabled');
          element.innerHTML = 'Loading...';
        }
        if (tagName === 'button') {
          Utils.addClass(element, 'disabled');
          element.setAttribute('disabled', 'disabled');
          element.innerHTML = 'Loading...';
        }
        bindingContext.$root.navigate(page);
        return false;
      };
    }
  };

  //loadingBtn
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
          Utils.addClass(element, 'disabled');
        }
        element.innerHTML = 'Loading...';
      } else {
        if (tagName === 'button' || tagName === 'a') {
          element.removeAttribute('disabled');
          Utils.removeClass(element, 'disabled');
        }
        element.innerHTML = window._loadingTpls[name];
      }
    }
  };
});
