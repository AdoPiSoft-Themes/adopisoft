define([
  'knockout'
], function (ko) {
  ko.components.register('gcash-cashin', {
    viewModel: { require: 'app/pages/gcash-cashin/GcashCashinVM.js' },
    template: { require: 'text!app/pages/gcash-cashin/gcash-cashin.html' }
  })
})