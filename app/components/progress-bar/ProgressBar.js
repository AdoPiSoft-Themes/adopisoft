define([
  'knockout',
  'text!./progress-bar.html'
], function (ko, html) {
  ko.components.register('progress-bar', {
    viewModel: function (params) {
      var self = this;
      this.klass = ko.pureComputed(function() {
        return self.current() < 10 ? 'progress-bar-danger' : 'progress-bar-warning';
      });
      this.current = params.current;
      this.total = params.total;
      this.percent = ko.pureComputed(function () {
        return self.current() / self.total() * 100;
      });
      this.interval = setInterval(function () {
        self.tick();
      }, 1000);
      this.tick = function () {
        this.current(this.current() - 1);
      };
      this.dispose = function() {
        clearInterval(this.interval);
      };
    },
    template: html
  });
});
