define(function () {

  function Ajax() {
    var self = this;
    this.toParams = function(obj) {
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

    };
    this.parseResponse = function (http, cb) {
      var data, res;
      try {
        data = JSON.parse(http.responseText);
        res = {
          xmlhttp: http,
          status: http.status,
          data: data
        };
        cb(null, res);
      } catch (e) {
        data = {error: e.toString()};
        res = {
          xmlhttp: http,
          status: http.status,
          data: data
        };
        cb(res);
      }
    };
    this.ajax = function (opts) {
      var method = opts.method || 'GET';
      var url = opts.url;
      var data = opts.data;
      var successCb = opts.success;
      var errorCb = opts.error;
      var http = new XMLHttpRequest();
      http.onreadystatechange = function() {
        if (http.readyState === XMLHttpRequest.DONE) { // XMLHttpRequest.DONE == 4
          self.parseResponse(http, function (err, res) {
            if (http.status === 200 && !err) {
              successCb(res.data);
            } else {
              errorCb(err || res);
            }
          });
        }
      };
      
      http.open(method, url, true);
      http.setRequestHeader('Accept', 'application/json');

      if (method === 'POST') {
        //Send the proper header information along with the request
        http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        var params = self.toParams(data);
        http.send(params);
      } else {
        http.send();
      }
    };
  }

  return new Ajax();
});
