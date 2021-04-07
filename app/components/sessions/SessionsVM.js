define(['knockout'], function (ko) {
  function MyViewModel() {
    this.sessions = ko.observableArray([]);
    this.stopSessionsTick = function () {
      var sessions = this.sessions();
      for (var i = 0; i < sessions.length; i++) {
        var s = sessions[i];
        s.stopTick();
      }
    };
  }
  return MyViewModel;
});
