define(function () {
  return function reduce(arr, iteratorFn, initial) {
    var ret = initial;
    for (var i = 0; i < arr.length; i++) {
      var item = arr[i];
      ret = iteratorFn(ret, item); 
    }
    return ret;
  };
});
