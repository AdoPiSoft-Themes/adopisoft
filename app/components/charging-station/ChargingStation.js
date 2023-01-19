define([
  'knockout',
  'rootVM',
  'toast',
  'translator',
  'sounds'
], function (ko, rootVM, toast, translator, sounds) {
  ko.components.register('charging-station', {
    viewModel: function(params) {
      var self = this
      self.hasChargingPlugin = params.hasChargingPlugin
      self.loading = ko.observable(false)

      self.clickCharging = function () {
        sounds.error.play()
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