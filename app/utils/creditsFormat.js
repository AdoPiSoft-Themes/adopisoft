define(['./shortSecondsFormat'], function (formatseconds) {
  return function(item) {
    var type = item.type,
      seconds = item.seconds,
      megabytes = item.megabytes,
      data_consumption_mb = item.data_consumption_mb;

    if (type === 'time') return formatseconds(seconds);
    else if (type === 'data') return megabytes.toFixed(2) + 'MB';
    else if (type === 'time_or_data') return formatseconds(seconds) + '/' + megabytes.toFixed(2) + 'MB';
    else {
      return data_consumption_mb
        ? data_consumption_mb.toFixed(2) + 'MB'
        : 'subscription';
    }
  };
});
