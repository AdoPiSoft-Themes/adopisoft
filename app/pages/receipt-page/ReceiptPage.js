define([
  'knockout',
  'rootVM',
  'app/observables/receipt',
  'app/services/sessions',
  'app/observables/session',
  'app/services/http'
], function(ko, rootVM, receipt, sessions, Session, http) {
  ko.components.register('receipt-page', {
    viewModel: function ReceiptPage() {
      this.receipt = receipt;
      this.sessions = sessions;
      this.koDescendantsComplete = function () {
        rootVM.showingStatusNav(false);
        rootVM.showingBanners(false);
        rootVM.showingSessionsTable(false);
      };
      this.connect = function() {
        http.startSession(receipt.sessionId(), function(err, data) {
          var s = new Session(data);
          sessions.get().push(s);
          rootVM.navigate('home-page');
        });
      };
    },
    template: {require: 'text!app/pages/receipt-page/receipt-page.html'}
  });
});
