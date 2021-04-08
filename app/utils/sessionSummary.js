define([
  'app/utils/formatBytes',
  'app/utils/shortSecondsFormat'
], function (formatMB, formatseconds) {
  return function (sessions) {
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

    if (time_total) summary += formatseconds(time_total);
    if (data_total) {
      if (time_total) summary += '/';
      summary += formatMB(data_total);
    }
    if (subs_total) {
      if (time_total || data_total) summary += ' and ';
      summary += subs_total + ' Subscription' + (subs_total > 1 ? 's' : '');
    }
    return summary;

  };
});
