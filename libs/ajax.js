define(function () {

  function getHttp() {
    return window.ActiveXObject
      ? new window.ActiveXObject('Microsoft.XMLHTTP')
      : new window.XMLHttpRequest();
  }

  function toParams(obj) {
    if (!obj) return '';
    var str = '';
    for (var key in obj) {
      if (typeof key === 'string' || typeof key === 'number' || typeof key === 'boolean') {
        if (str !== '') {
          str += '&';
        }
        str += encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]);
      }
    }
    return str;
  }

  return function Ajax(opts) {
    var method = opts.method || 'GET';
    var url = opts.url;
    var data = opts.data;
    var successCb = opts.success;
    var errorCb = opts.error;

    var http = getHttp();

    http.onreadystatechange = function() {
      if (http.readyState === 4) { // XMLHttpRequest.DONE == 4
        if (http.status >= 200 && http.status < 400) {
          var json = JSON.parse(http.responseText);
          successCb(json);
        } else {
          errorCb(http);
        }
      }
    };
      
    http.open(method, url, true);
    http.setRequestHeader('Accept', 'application/json');

    if (method.toLowerCase() === 'post') {
      try {
      //Send the proper header information along with the request
        http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        var params = toParams(data);
        http.send(params);
      } catch(e) {
        errorCb(e);
      }
    } else {
      http.send();
    }

  };

});
