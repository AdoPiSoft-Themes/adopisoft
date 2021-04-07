define('./secondsObject', function (getSecondsComponents) {
  return function longFormat (seconds) {
    var sec = getSecondsComponents(seconds);
    var text = sec.seconds + ' sec';
    if (sec.mins > 0) text = sec.mins + ' min and ' + text;
    if (sec.hours > 0) text = sec.hours + ' hr' + (sec.mins > 0 ? ', ' : ' and ') + text;
    if (sec.days > 0) text = sec.days + ' day' + (sec.days > 1 ? 's' : '') + (sec.hours > 0 || sec.mins > 0 ? ', ' : ' and ') + text;

    return text.replace('and 0 sec', '');
  };
});
