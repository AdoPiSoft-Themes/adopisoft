define([
  'knockout'
], function (ko) {
  ko.components.register('voucher-form', {
    viewModel: function() {
    },
    template: {require: 'text!app/components/voucher-form/voucher-form.html'}
  });
});
