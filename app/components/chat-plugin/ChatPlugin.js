define([
  'knockout',
  'rootVM',
  'toast',
  'translator',
  'sounds'
], function(ko, rootVM, toast, translator, sounds) {
  ko.components.register('chat-plugin', {
    viewModel:  function (params) {
      var self = this;
      self.hasChatPlugin = params.hasChatPlugin

      self.clickChat = function () {
        sounds.error.play()
        toast.error(translator.print('CHAT_PLUGIN_INSTALL_ERR'))
      }
    },
    template: {require: 'text!app/components/chat-plugin/chat-plugin.html'}
  })
})