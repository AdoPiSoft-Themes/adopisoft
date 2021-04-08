define(['knockout', 'app/observables/sessions', 'app/utils/array.find'],function (ko, sessions, find) {
  return function WifiStatus() {
    this.connected = ko.pureComputed(function () {
      var sessionsArr = sessions();
      var s = find(sessionsArr, function (s) {
        return s.status() === 'running';
      });
      return !!s;
    });
  };
});
