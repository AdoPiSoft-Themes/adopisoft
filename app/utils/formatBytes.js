define(function () {
  // converts megabytes to with unit
  return function formatBytes(megabytes, decimals) {
    decimals = decimals || 2;
    var k = 1024;
    var bytes = (megabytes || 0) * k * k;
    if (bytes === 0) return '0 Bytes';
    var dm = decimals < 0 ? 0 : decimals;
    var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    var i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + sizes[i];
  };
});
