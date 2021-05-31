define([
  'knockout',
  'modal'
],function (ko, modal) {

  function ModalVM () {
    var self = this;
    self.modalComponent = ko.observable('');
    self.modalOptions = ko.observable({});
    self.fullScreen = ko.observable(false);
    self.backdropClose = ko.observable(false);

    self.show = function (component, opts) {
      opts = opts || {};
      opts.close = self.hide;

      self.modalComponent(component);
      self.modalOptions(opts);
      self.fullScreen(opts.full_screen || false);
      self.backdropClose(opts.backdrop_close || false);
    };

    self.hide = function() {
      self.modalComponent(null);
    };

    self.backdropClicked = function () {
      if (self.backdropClose()) {
        self.hide();
      }
    };

    return modal.init(self);
  }

  ko.components.register('modal', {
    viewModel: ModalVM,
    template: {require: 'text!app/components/modal/modal.html'}
  });

});
