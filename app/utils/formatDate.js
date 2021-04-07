define(function () {
// https://stackoverflow.com/questions/8888491/how-do-you-display-javascript-datetime-in-12-hour-am-pm-format
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

  // https://stackoverflow.com/questions/10632346/how-to-format-a-date-in-mm-dd-yyyy-hhmmss-format-in-javascript
  return function(d) {
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

});
