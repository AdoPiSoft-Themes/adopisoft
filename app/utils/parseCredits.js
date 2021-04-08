define(['jquery', 'app/utils/creditsFormat'], function ($, creditsFormat) {
  return function parseCredits(session) {
    try {
      var type = session.type,
        data_mb = session.data_mb,
        data_consumption_mb = session.data_consumption_mb,
        running_time_seconds = session.running_time_seconds(),
        remaining_time_seconds = session.remaining_time_seconds();

      var megabytes = (type === 'data' || type === 'time_or_data')
        ? data_mb - data_consumption_mb
        : data_consumption_mb;

      var seconds = type === 'subscription'
        ? running_time_seconds
        : remaining_time_seconds;

      return creditsFormat({
        type: type,
        seconds: seconds,
        megabytes: megabytes,
        data_consumption_mb: data_consumption_mb
      });
    } catch(e) {
      console.log(session);
      return '';
    }

  };
});
