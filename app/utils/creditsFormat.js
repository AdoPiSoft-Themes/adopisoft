define(['./shortSecondsFormat', './formatBytes'], function (formatseconds, formatBytes) {
  return function(item) {

    var type = item.type;

    if (type === 'time') return formatseconds(item.seconds);
    else if (type === 'data') return formatBytes(item.megabytes) + '/' + formatBytes(item.data_mb);
    else if (type === 'time_or_data') return formatseconds(item.seconds) + '/' + formatBytes(item.megabytes);
    else {
      return 'Subscription'
    }
  };
});
