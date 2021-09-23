define([
  'knockout',
  'app/services/config'
], function (ko, config) {

  var tpl = '<div class="modal-header text-center">' +
    '<h2>' + 'Announcement' + '</h2>' +
    '</div>' +
    '<div class="modal-body">' +
    config.findField('banners', 'popup_banner') +
    '</div>' +
    '<div class="modal-footer"><button class="btn btn-default" data-bind="click: close">'+
    'Close' +
    '</button></div>';

  ko.components.register('popup-banner', {
    template: tpl,
    viewModel: function (opts) {
      this.close = opts.close;
    }
  });
});
