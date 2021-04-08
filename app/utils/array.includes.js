define(['app/utils/array.find'], function (find) {
  return function includes(arr, item) {
    var found = find(arr, function (i) {
      return i === item;
    });
    return !!found;
  };
});
