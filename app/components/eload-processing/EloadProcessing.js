define([
  'knockout',
  'core/rootVM',
  'text!app/components/eload-processing/eload-processing.html',
  'core/services/socket',
  'app/services/sounds'
], function(ko, rootVM, tpl, socket, sounds) {
  function VM(params) {
    var loader_icon = '<img src="/uploads/img/preloader.gif" style="width: 20px;margin: 10px;"/>';
    var self = this;
    self.account_number = ko.observable(params.account_number);
    self.title = ko.observable('Submitting Request');
    self.message = ko.observable('Please wait ...' + loader_icon);
    self.allow_retry = ko.observable(false);
    self.status = ko.observable('');

    self.close = function() {
      params.close();
      rootVM.navigate('buy-eload-page');
    };
    self.retry = self.close;

    setTimeout(function() {
      if(!self.status() || self.status() === 'queued') {
        self.allow_retry(true);
        sounds.eload_queued.play();
      }
    }, 15000);

    sounds.eload_processing.play();
    self.onEloadStatus = function(data) {
      var message = data.message;
      if(data.status === 'failed') {
        sounds.eload_failed.play();
        self.allow_retry(false);
      }else if(data.status === 'succeed') {
        sounds.eload_successful.play();
        self.allow_retry(false);
      }else if(data.status === 'queued') {
        message += loader_icon;
      }
        
      self.status(data.status);
      self.title(data.title);
      self.message(message);
      self.account_number(data.acc_number);
    };

    socket().on('eload:status', self.onEloadStatus);

    self.dispose = function () {
      socket().removeListener('eload:status', self.onEloadStatus);
    };
  }

  ko.components.register('eload-processing', {
    viewModel: VM,
    template: tpl
  });

});
