define([
  'knockout',
  'app/components/banners/BannersVM',
  'text!app/components/banners/banners-component.html' 
], function (ko, vm, tpl) {

  ko.components.register('banners', {
    viewModel: vm,
    template: tpl
  });

});
