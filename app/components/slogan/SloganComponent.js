define(['knockout', 'json!../../../config.json'], function(ko, config) {
  var props = config.custom_fields.find(function (f) {
    return f.field_group_id === 'page_properties';
  });
  var slogan_field = props.fields.find(function (p) {
    return p.field_id === 'slogan_html';
  });
  
  ko.components.register('slogan', {
    template: slogan_field.value
  });

});
