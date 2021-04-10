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
        var body = document.getElementsByTagName('body')[0];
        body.innterHTML = '<h1 class="text-center">Please wait. <br/> Redirecting to ' + redirect_url + '</h1>';
      }, 3000);
    },
    cancel: cancel
  };
});
