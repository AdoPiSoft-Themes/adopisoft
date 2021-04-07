define(function () {

  return function getSecondsComponents(input) {
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

});
