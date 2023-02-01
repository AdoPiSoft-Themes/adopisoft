define(['knockout'], function(ko) {
  return {
    intent: ko.observable(''),
    rateType: ko.observable(''),
    isVoucher: ko.observable(false),
    eloadOptions: ko.observable({}),
    coinslotId: ko.observable('')
  };
});
