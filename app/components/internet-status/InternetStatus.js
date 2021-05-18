define([
  'knockout',
  'http'
], function (ko, http) {
  ko.components.register('internet-status', {
    viewModel: function () {
      var self = this;
      self.online = ko.observable(true);
      http.systemNotifications(function (err, res) {
        self.online(res.is_online);
      });
    },
    template: {require: 'text!app/components/internet-status/internet-status.html'} 
  });
});
