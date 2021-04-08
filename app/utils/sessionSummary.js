define([
  'app/utils/array.filter',
  'app/utils/array.includes',
  'app/utils/array.reduce',
  'app/utils/array.map',
  'app/utils/formatBytes',
  'app/utils/shortSecondsFormat'
], function (filter, includes, reduce, map, formatMB, formatseconds) {
  return function (sessions) {
    var summary = '';
    if(!sessions || (sessions && !sessions.length)) return summary;
    var time = filter(sessions, function (s) { return includes(['time', 'time_or_data'], s.type); });
    time = map(time, function(s) { return s.remaining_time_seconds || 0; });
    time = reduce(time, function (a, b) { return a + b; }, 0);
    if(time) summary += formatseconds(time);

    var data = filter(sessions, function(s) { return includes(['data', 'time_or_data'], s.type); });
    data = map(data, function(s) { return s.remaining_data_mb || 0; });
    data = reduce(data, function (a, b) { return a + b; }, 0);
    if(data > 0) {
      if(time) summary += '/';
      summary += formatMB(data);
    }
    var subscriptions = filter(sessions, function (s) { return s.type === 'subscription'; });
    if(subscriptions.length) {
      if(time || data) summary += ' and ';
      summary += subscriptions.length + ' Subscription' + (subscriptions.length > 1 ? 's' : '');
    }
    console.log(summary);
    return summary;
  };
});
