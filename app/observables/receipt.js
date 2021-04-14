define([
  'knockout',
  'wifiRates'
], function(ko, wifiRates) {
  var receipt = {
    isVoucher: ko.observable(false),
    voucherCode: ko.observable(''),
    type: ko.observable(''),
    currency: wifiRates.currency,
    amount: ko.observable(0),
    credits: ko.observable(0),
    sessionId: ko.observable(0),
    reset: function () {
      receipt.isVoucher(false);
      receipt.type('');
      receipt.amount(0);
      receipt.credits(0);
      receipt.sessionId(0);
      receipt.voucherCode('');
    }
  };
  return receipt;
});
