define([
  'knockout',
  'rootVM',
  'http',
  'sessions',
  'app/observables/receipt',
  'app/observables/session',
  'app/components/voucher-form/VoucherForm',
  'app/bindings/clipboard'
], function(ko, rootVM, http, sessions, receipt, Session) {
  return function ReceiptPage() {
    var self = this;
    self.receipt = receipt;
    self.sessions = sessions;
    self.copied = ko.observable(false);
    self.koDescendantsComplete = function () {
      rootVM.showingStatusNav(false);
      rootVM.showingBanners(false);
      rootVM.showingSessionsTable(false);
    };
    self.afterCopy = function() {
      self.copied(true);
    };
    self.connect = function() {
      http.startSession(receipt.sessionId(), function(err, data) {
        var s = new Session(data);
        sessions.get().push(s);
        rootVM.navigate('home-page');
      });
    };
  };
});
