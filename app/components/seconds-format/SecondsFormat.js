define([
  'knockout',
  'app/utils'
], function (ko, Utils) {

  ko.components.register('seconds-format', {
    viewModel: function (params) {
      params = params || {seconds: ko.observable(0)};
      this.value = ko.pureComputed(function () {
        var short_or_long = params.format || 'short';
        if (short_or_long !== 'short') return Utils.seconds.long(params.seconds());
        else return Utils.seconds.short(params.seconds());
      });
    },
    template: '<span data-bind="text: value"></span>'
  });

});
