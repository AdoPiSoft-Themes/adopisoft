define([
  'app/observables/payment',
  'rootVM'
], function (payment, rootVM) {
  console.log(payment);
  return function () {
    this.koDescendantsComplete = function () {
      rootVM.showingStatusNav(true);
      rootVM.showingBanners(true);
      rootVM.showingSessionsTable(false);
    };
  };
});
