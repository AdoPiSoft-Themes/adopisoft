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
    var mm_dd_yy = [
      d.getMonth() + 1,
      d.getDate(),
      d.getFullYear()].join('/');

    var hh_mm = formatAMPM(d);
  
    return mm_dd_yy + ' ' + hh_mm;

  };

});
