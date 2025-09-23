define([
  'knockout',
  'modal',
  'text!app/components/modal/modal.html'
],function (ko, modal, tpl) {

  function ModalVM () {
    var self = this;
    self.modalComponent = ko.observable('');
    self.modalOptions = ko.observable({});

    self.show = function(component, opts) {
      self.modalComponent(component);
      opts = opts || {};
      opts.close = function (args) {
        if (typeof opts.onClose === 'function') {
          opts.onClose(args)
        }

        return self.hide()
      }
      self.modalOptions(opts);
    };

    self.hide = function() {
      self.modalComponent(null);
    };
    self.close = self.hide

    return modal.init(self);
  }

  ko.components.register('modal', {
    viewModel: ModalVM,
    template: tpl
  });

});
