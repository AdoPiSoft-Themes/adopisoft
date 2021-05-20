define(['knockout'], function (ko) {

  function httpClient() {
    return window.ActiveXObject
      ? new window.ActiveXObject('Microsoft.XMLHTTP')
      : new window.XMLHttpRequest();
  }

  function serialize(obj) {
    var str = [];

    for (var p in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, p)) {
        str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
      }
    }
    return str.join('&');
  }

  return function Ajax(opts) {
    var method = (opts.method || 'GET').toUpperCase();
    var url = opts.url;
    var data = opts.data || {};
    var successCb = opts.success;
    var errorCb = opts.error;

    var http = httpClient();

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

    // prevent ajax caching
    if (method === 'GET') {
      var cache_bust = Math.random().toString().replace('.', '');
      url += url.indexOf('?') > -1 ? '&' : '?';
      url += serialize({cache_bust: cache_bust});
    }

    http.open(method, url, true);
    http.setRequestHeader('Accept', 'application/json');

    if (method === 'POST') {
      try {
        //Send the proper header information along with the request
        http.setRequestHeader('Content-type', 'application/json');
        var params = ko.toJSON(data);
        http.send(params);
      } catch(e) {
        errorCb(e);
      }
    } else {
      http.send();
    }

  };

});

