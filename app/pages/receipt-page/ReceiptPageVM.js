define([
  'knockout',
  'rootVM',
  'http',
  'sessions',
  'app/observables/receipt',
  'app/components/voucher-form/VoucherForm',
  'app/bindings/clipboard'
], function(ko, rootVM, http, sessions, receipt) {
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
      if (!sessions.hasRunning() && receipt.sessionId()) {
        self.connect();
      }
    };
    self.afterCopy = function() {
      self.copied(true);
    };
    self.connect = function() {
      self.connecting(true);
      http.startSession(receipt.sessionId(), function(err) {
        self.connecting(false);
        if (err) return http.catchError(err);
        rootVM.navigate('home-page');
      });
    };
  };
});
