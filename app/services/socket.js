define([
  'core/services/socket',
  'core/services/translator',
  'core/services/redirect',
  'app/services/toast',
  'app/services/sounds'
], function (socket, translator, redirect, toast, sounds) {

  var s = socket();

  s.on('device:connected', function() {
    toast.success('Yehey!', translator.print('CONNECTED_TO_INTERNET'));
    sounds.connected.play();
    redirect.redirect();
  });

  s.on('device:disconnected', function() {
    redirect.cancel();
    toast.error('Oppps!', translator.print('DISCONNECTED_FROM_INTERNET'));
    sounds.disconnected.play();
  });

});
