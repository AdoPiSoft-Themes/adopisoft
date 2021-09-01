define([
  'knockout'
], function (ko) {

  var Utils = {};

  Utils.addClass = function (el, klass) {
    if (el.classList) {
      el.classList.add(klass);
    } else if (el.className) {
      el.className += klass;
    }
  };

  Utils.removeClass = function (el, klass) {
    if (el.classList) {
      el.classList.remove(klass);
    } else if (el.className) {
      var classes = el.getAttribute('class') || '';
      el.className = classes.replace(klass, '');
    }
  };

  Utils.array = {
    filter: function (arr, iteratorFn) {
      var new_arr = [];
      for (var i = 0; i < arr.length; i++) {
        var item = arr[i];
        if (iteratorFn(item)) new_arr.push(item);
      }
      return new_arr;
    },
    find: function(arr, iteratorFn) {
      for (var i = 0; i < arr.length; i++) {
        var item = arr[i];
        if (iteratorFn(item)) {
          return item;
        }
      }
    },
    includes: function (arr, item) {
      var found = Utils.array.find(arr, function (i) {
        return i === item;
      });
      return !!found;
    },
    map: function (arr, iteratorFn) {
      var newArr = [];
      for (var i = 0; i < arr.length; i++) {
        var item = arr[i];
        newArr.push(iteratorFn(item));
      }
      return newArr;
    },
    reduce: function(arr, iteratorFn, initial) {
      var ret = initial;
      for (var i = 0; i < arr.length; i++) {
        var item = arr[i];
        ret = iteratorFn(ret, item);
      }
      return ret;
    }
  };

  Utils.secondsObject = function(input) {
    var days, hours, mins, seconds, secs;
    secs = input > 0 ? input : 0;
    secs = Math.round(secs);
    mins = Math.floor(secs / 60);
    seconds = secs - mins * 60;
    hours = Math.floor(mins / 60);
    mins = mins - hours * 60;
    days = Math.floor(hours / 24);
    hours = hours - days * 24;
    return {
      days: days || 0,
      hours: hours || 0,
      mins: mins || 0,
      seconds: seconds || 0
    };
  };

  Utils.seconds = {
    short:function (seconds) {
      var sec = Utils.secondsObject(seconds);
      var text = sec.seconds + 's';
      if(sec.hours > 0 || sec.days > 0 || sec.mins > 0) text = sec.mins + 'm:' + text;
      if(sec.days > 0 || sec.hours > 0) text = sec.hours + 'h:' + text;
      if(sec.days > 0) text = sec.days + 'd:' + text;
      return text;
    },
    long: function (seconds) {
      var sec = Utils.secondsObject(seconds);
      var text = sec.seconds + ' sec';
      if (sec.mins > 0) text = sec.mins + ' min and ' + text;
      if (sec.hours > 0) text = sec.hours + ' hr' + (sec.mins > 0 ? ', ' : ' and ') + text;
      if (sec.days > 0) text = sec.days + ' day' + (sec.days > 1 ? 's' : '') + (sec.hours > 0 || sec.mins > 0 ? ', ' : ' and ') + text;
      return text.replace('and 0 sec', '');
    }
  };

  Utils.formatBytes = function(megabytes, decimals) {
    decimals = decimals || 2;
    var k = 1000; // or 1024 ???
    var bytes = (megabytes || 0) * k * k;
    if (bytes === 0) return '0 Bytes';
    var dm = decimals < 0 ? 0 : decimals;
    var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    var i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + sizes[i];
  };

  Utils.creditsFormat = function(item) {
    var type = item.type;
    if (type === 'time') return Utils.seconds.short(item.seconds);
    else if (type === 'data') return Utils.formatBytes(item.megabytes);
    else if (type === 'time_or_data') return Utils.seconds.short(item.seconds) + '/' + Utils.formatBytes(item.megabytes);
    else {
      return item.data_consumption_mb
        ? Utils.formatBytes(item.data_consumption_mb)
        : 'subscription';
    }
  };

  Utils.formatDate = function(d) {
    // https://stackoverflow.com/questions/8888491/how-do-you-display-javascript-datetime-in-12-hour-am-pm-format
    // https://stackoverflow.com/questions/10632346/how-to-format-a-date-in-mm-dd-yyyy-hhmmss-format-in-javascript

    function formatAMPM(date) {
      var hours = date.getHours();
      var minutes = date.getMinutes();
      var ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      minutes = minutes < 10 ? '0' + minutes : minutes;
      var strTime = hours + ':' + minutes + ampm;
      return strTime;
    }

    try {
      var date = typeof d === 'string' ? new Date(d) : d;
      var mm = date.getMonth() + 1;
      var dd = date.getDate();
      var yyyy = date.getFullYear();
      if ((mm && dd && yyyy)) { // mm dd and yyyy are NaN in ie8 and below versions
        var mm_dd_yy = [mm, dd, yyyy].join('/');
        var hh_mm = formatAMPM(date);
        return mm_dd_yy + ' ' + hh_mm;
      } else {
        return d;
      }
    } catch(e) {
      return d;
    }
  };

  Utils.parseCredits = function(session) {
    try {
      var type = session.type,
        data_mb = session.data_mb(),
        data_consumption_mb = session.data_consumption_mb(),
        running_time_seconds = session.running_time_seconds(),
        remaining_time_seconds = session.remaining_time_seconds();

      var megabytes = (type === 'data' || type === 'time_or_data')
        ? data_mb - data_consumption_mb
        : data_consumption_mb;

      var seconds = type === 'subscription'
        ? running_time_seconds
        : remaining_time_seconds;

      return Utils.creditsFormat({
        type: type,
        seconds: seconds,
        megabytes: megabytes,
        data_consumption_mb: data_consumption_mb
      });
    } catch(e) {
      console.error(e);
      return '';
    }
  };

  Utils.sessionSummary = function (sessions) {
    if(!sessions || (sessions && !sessions.length)) return summary;
    var summary = '';
    var time_total = 0;
    var data_total = 0;
    var subs_total = 0;
    for (var i = 0; i < sessions.length; i++) {
      var s = sessions[i];
      var type = s.type;
      if (type === 'time' || type === 'time_or_data') {
        time_total += s.remaining_time_seconds();
      }
      if (type === 'data' || type === 'time_or_data') {
        data_total += s.remaining_data_mb();
      }
      if (type === 'subscription') {
        subs_total++;
      }
    }
    if (time_total) summary += Utils.seconds.short(time_total);
    if (data_total) {
      if (time_total) summary += '/';
      summary += Utils.formatBytes(data_total);
    }
    if (subs_total) {
      if (time_total || data_total) summary += ' and ';
      summary += subs_total + ' Subscription' + (subs_total > 1 ? 's' : '');
    }
    return summary;
  };

  Utils.ajax = function (opts) {
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
  }; // end Ajax

  return Utils;

});
