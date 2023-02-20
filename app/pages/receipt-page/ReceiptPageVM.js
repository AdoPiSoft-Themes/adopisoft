define([
  'knockout',
  'rootVM',
  'http',
  'sessions',
  'app/observables/receipt',
  'app/observables/device',
  'modal',
  'app/components/voucher-form/VoucherForm',
  'app/bindings/clipboard'
], function(ko, rootVM, http, sessions, receipt, device, modal) {
  return function ReceiptPage() {
    var self = this;
    self.receipt = receipt;
    self.sessions = sessions;
    self.copied = ko.observable(false);
    self.enablePasscode = ko.observable(false);
    self.connecting = ko.observable(false);
    self.device = device

    self.koDescendantsComplete = function () {
      rootVM.showingStatusNav(false);
      rootVM.showingBanners(false);
      rootVM.showingSessionsTable(false);
      if (!sessions.hasRunning() && receipt.sessionId()) {
        self.connect();
      }

      http.securityConfig(function(err, data) {
        if(err) return self.enablePasscode(false);
        self.enablePasscode(data.enable_passcode);
      });
    };
    self.afterCopy = function() {
      self.copied(true);
    };
    self.editPasscode = function () {
      modal.show('passcode-modal', {onClose: function () {
        device.fetch(function () {})
      }});
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
