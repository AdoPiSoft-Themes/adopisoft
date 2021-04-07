define(['./secondsObject'], function (getSecondsComponents) {
  return function shortFormat (seconds) {
    var sec = getSecondsComponents(seconds);
    var text = sec.seconds + 's';

    if(sec.hours > 0 || sec.days > 0 || sec.mins > 0) text = sec.mins + 'm:' + text;
    if(sec.days > 0 || sec.hours > 0) text = sec.hours + 'h:' + text;
    if(sec.days > 0) text = sec.days + 'd:' + text;
    return text;
  };
});
