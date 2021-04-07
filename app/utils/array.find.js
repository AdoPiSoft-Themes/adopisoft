define(function() {
  return function find(arr, iteratorFn) {
    for (var i = 0; i < arr.length; i++) {
      var item = arr[i];
      if (iteratorFn(item)) {
        return item;
      }
    }
  };
});

