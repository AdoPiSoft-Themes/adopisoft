define([
  'knockout',
  'core/rootVM',
  'core/services/http',
  'app/services/http',
  'core/services/sessions',
  'app/observables/receipt',
  'app/components/voucher-form/VoucherForm',
  'app/bindings/clipboard'
], function(ko, rootVM, core_http, app_http, sessions, receipt) {
  return function ReceiptPage() {
    var self = this;
    self.receipt = receipt;
    self.sessions = sessions;
    self.copied = ko.observable(false);
    self.connecting = ko.observable(false);
    self.koDescendantsComplete = function () {
      rootVM.showingStatusNav(false);
      rootVM.showingBanners(false);
      rootVM.showingSessionsTable(false);
    };
    self.afterCopy = function() {
      self.copied(true);
    };
    self.connect = function() {
      self.connecting(true);
      core_http.startSession(receipt.sessionId(), function(err) {
        self.connecting(false);
        if (err) return app_http.catchError(err);
        rootVM.navigate('home-page');
      });
    };
  };
});
