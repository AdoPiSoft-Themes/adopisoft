define(
  ['knockout', 'jquery', 'toast', 'app/utils/http', 'app/observables/session', 'app/utils/array.map'],
  function(ko, $, toast, http, Session, map) {

    ko.bindingHandlers.sessions = {
      init: function(element, valueAccessor, allBindingsAccessor, viewModel) {

        function featchSessions() {
          http.get('/client/sessions', function(err, data) {
            if (err) return toast.error('Error in sessions list!');
            viewModel.stopSessionsTick();
            viewModel.sessions(map(data, function (s) {
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
