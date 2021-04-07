define(['app/utils/config'], function (config) {
  var redirect_url = config.findField('page_properties', 'redirect_to').value;
  var timeout;

  function cancel() {
    if(timeout) clearTimeout(timeout);
    timeout = null;
  }

  return {
    redirect: function () {
      timeout = setTimeout(function () {
        location.href = redirect_url;
        timeout = null;
      }, 2500);
    },
    cancel: cancel
  };
});
