define([
  'knockout',
  'text!app/components/socket-disconnected-alert/socket-disconnected-alert.html'
], function (ko, html) {
  ko.components.register('socket-disconnected-alert', {
    template: html
  });
});
