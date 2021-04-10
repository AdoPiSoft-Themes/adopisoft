define(function () {
  return function addClass(el, klass) {
    if (el.classList) {
      el.classList.add(klass);
    } else if (el.className) {
      el.className += klass;
    }
  };
});
