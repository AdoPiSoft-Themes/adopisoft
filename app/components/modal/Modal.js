define([
  'knockout',
  'app/services/modal'
],function (ko, modal) {

  function ModalVM () {
    var self = this;
    self.modalComponent = ko.observable('');
    self.modalOptions = ko.observable({});

    self.show = function(component, opts) {
      self.modalComponent(component);
      opts = opts || {};
      opts.close = self.hide;
      self.modalOptions(opts);
    };

    self.hide = function() {
      self.modalComponent(null);
    };

    return modal.init(self);
  }

  ko.components.register('modal', {
    viewModel: ModalVM,
    template: {require: 'text!app/components/modal/modal.html'}
  });

});
