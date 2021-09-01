define([
  'knockout',
  'rootVM',
  'http',
  'app/utils'
], function(ko, rootVM, http, Utils) {
  ko.components.register('view-vouchers', {
    viewModel: function () {
      var self = this;
      self.vouchers = ko.observableArray([]);
      self.koDescendantsComplete = function () {
        rootVM.showingStatusNav(true);
        rootVM.showingBanners(true);
        rootVM.showingSessionsTable(false);
      };

      http.getVouchers(function (err, vouchers) {
        Utils.array.map(vouchers, function(v) {
          self.vouchers.push(v);
        });
      });
    },
    template: {require: 'text!app/pages/view-vouchers/view-vouchers.html'}
  });
});
