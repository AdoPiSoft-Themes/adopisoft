define(function () {
  return function filter(arr, iteratorFn) {
    var new_arr = [];
    for (var i = 0; i < arr.length; i++) {
      var item = arr[i];
      if (iteratorFn(item)) new_arr.push(item);
    }
    return new_arr;
  };
});
