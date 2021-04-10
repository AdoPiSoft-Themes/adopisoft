define(['knockout'], function(ko) {
  return {
    intent: ko.observable(''),
    rateType: ko.observable(''),
    isVoucher: ko.observable(false)
  };
});
