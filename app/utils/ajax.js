define(['knockout'], function (ko) {

  function getHttp() {
    return window.ActiveXObject
      ? new window.ActiveXObject('Microsoft.XMLHTTP')
      : new window.XMLHttpRequest();
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
