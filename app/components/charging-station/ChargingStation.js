define([
  'knockout',
  'rootVM',
  'toast',
  'translator'
], function (ko, rootVM, toast, translator) {
  ko.components.register('charging-station', {
    viewModel: function(params) {
      var self = this
      self.hasChargingPlugin = params.hasChargingPlugin
      self.loading = ko.observable(false)

      self.clickCharging = function () {
        toast.error(translator.print('CHARGING_STATION_INSTALL_ERR'))
      }

      self.buyCharging = function () {
        self.loading(true)
        rootVM.navigate('buy-charging')
      }


    },  
    template: { require: 'text!app/components/charging-station/charging-station.html' }
  })
})