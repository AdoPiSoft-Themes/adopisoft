define(['knockout', '../../utils/config'], function(ko, config) {
  var slogan_field = config.findField('page_properties', 'slogan_html');  
  ko.components.register('slogan', {
    template: slogan_field.value
  });
});

