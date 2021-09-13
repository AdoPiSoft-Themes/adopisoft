define(['http'], function (http) {
  var translations = {};
  var translator = {
    init: function (cb) {
      http.get('/language', function (err, data) {
        if (err) data = {lang: 'en'};
        http.get('app/translations/' + data.lang + '.json', function (err, data) {
          translations = data;
          cb(err);
        });
      });
    },
    print: function (args) {
      try {
        args = typeof args === 'string' ? [args] : args;
        var code = args.shift();
        var params = args;
        var message = translations[code];
        for (var i = 0; i < params.length; i++) {
          var arg_index = i + 1
          message = message.replace(`$${arg_index}`, params[i]);
        }
        return message;
      } catch (e) {
        console.log(e);
        return args[0];
      }
    }
  };
  return translator;
});
