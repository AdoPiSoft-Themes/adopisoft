define([
  'knockout',
  'app/observables/sessions'
], function (ko, sessions) {
  return function () {
    this.sessions = sessions; 
  };
});
