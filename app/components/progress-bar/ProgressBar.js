define([
  'knockout',
  'text!./progress-bar.html'
], function (ko, html) {
  ko.components.register('progress-bar', {
    viewModel: function (params) {
      var self = this;
      self.klass = ko.pureComputed(function() {
        return self.current() < 10 ? 'progress-bar-danger' : 'progress-bar-warning';
      });
      self.current = params.current;
      self.total = params.total;
      self.percent = ko.pureComputed(function () {
        return self.current() / self.total() * 100;
      });
      self.interval = setInterval(function () {
        self.tick();
      }, 1000);
      self.tick = function () {
        self.current(self.current() - 1);
      };
      self.dispose = function() {
        clearInterval(self.interval);
      };
    },
    template: html
  });
});
