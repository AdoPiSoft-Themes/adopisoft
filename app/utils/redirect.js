define(['app/utils/config'], function (config) {
  var redirect_url = config.findField('page_properties', 'redirect_to').value;
  return {
    redirect: function () {
      location.href = redirect_url;
    }
  };
});
