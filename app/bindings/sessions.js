define(['knockout', 'jquery', 'app/utils/http', 'app/observables/session'], function(ko, $, http, Session) {

  ko.bindingHandlers.sessions = {
    init: function(element, valueAccessor, allBindingsAccessor, viewModel) {

      function featchSessions() {
        http.get('/client/sessions', function(err, data) {
          if (err) return alert('Error in sessions list!');
          viewModel.stopSessionsTick();
          viewModel.sessions(data.map(function (s) {
            return new Session(s);
          }));
        });
      }

      featchSessions();
      var $_interval = setInterval(featchSessions, 10000);

      ko.utils.domNodeDisposal.addDisposeCallback(element, function() {
        clearInterval($_interval);
        viewModel.stopSessionsTick();
      });

    }
  };
});

