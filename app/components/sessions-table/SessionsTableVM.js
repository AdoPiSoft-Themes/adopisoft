define([
  'knockout',
  'app/observables/sessions'
], function (ko, sessions) {
  function MyViewModel() {
    this.sessions = sessions; 
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
