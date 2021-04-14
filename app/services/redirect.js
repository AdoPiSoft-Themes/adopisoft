define(['app/services/config'], function (config) {
  var redirect_url = config.findField('page_properties', 'redirect_to');
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
        var body = document.getElementById('body');
        body.innerHTML = '<h1 class="text-center">Please wait. <br/> Redirecting to ' + redirect_url + '</h1>';
      }, 3000);
    },
    cancel: cancel
  };
});
