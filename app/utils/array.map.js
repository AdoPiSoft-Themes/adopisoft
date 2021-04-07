define(function () {
  return function map(arr, iteratorFn) {
    var newArr = [];
    for (var i = 0; i < arr.length; i++) {
      var item = arr[i];
      newArr.push(iteratorFn(item));
    }
    return newArr;
  };
});
