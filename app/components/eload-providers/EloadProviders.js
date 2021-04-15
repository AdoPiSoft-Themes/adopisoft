define([
  'knockout',
  'text!app/components/eload-providers/eload-providers.html',
], function(ko, tpl) {

  function VM(params) {
    var self = this;
    self.logo_urls = {
      Globe: "/uploads/img/eload-logos/globe-logo.png",
      SMART: "/uploads/img/eload-logos/smart-logo.png",
      SUN: "/uploads/img/eload-logos/sun-logo.png",
      TNT: "/uploads/img/eload-logos/tnt-logo.png",
      TM: "/uploads/img/eload-logos/tm-logo.png",
      CIGNAL: "/uploads/img/eload-logos/cignal-logo.png",
      GSAT: "/uploads/img/eload-logos/gsat-logo.png",
      MERALCO: "/uploads/img/eload-logos/meralco-prepaid-logo.png",
      "SKY CABLE": "/uploads/img/eload-logos/sky-direct-logo.png",
      "CHERRY PREPA.": "/uploads/img/eload-logos/cherry-prepaid-logo.png",
    };
    self.logoUrl = function(p){
      p = p || "";
      return self.logo_urls[p] || self.logo_urls[p.toUpperCase()];
    }
    self.active_provider = params.active_provider;
    self.providers = params.providers;
  }

  ko.components.register('eload-providers', {
    viewModel: VM,
    template: tpl
  });

});
