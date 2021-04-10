define(function () {
  return function removeClass(el, klass) {
    if (el.classList) {
      el.classList.remove(klass);
    } else if (el.className) {
      var classes = el.getAttribute('class') || '';
      el.className = classes.replace(klass, '');
    }
  };
});
