define([
  'knockout',
  'text!app/components/eload-providers/eload-providers.html',
], function(ko, tpl) {

  function VM(params) {
    var self = this;
    self.logo_urls = {
      Globe: "/captive-portal/images/eload-logos/globe-logo.png",
      SMART: "/captive-portal/images/eload-logos/smart-logo.png",
      SUN: "/captive-portal/images/eload-logos/sun-logo.png",
      TNT: "/captive-portal/images/eload-logos/tnt-logo.png",
      TM: "/captive-portal/images/eload-logos/tm-logo.png",
      CIGNAL: "/captive-portal/images/eload-logos/cignal-logo.png",
      GSAT: "/captive-portal/images/eload-logos/gsat-logo.png",
      MERALCO: "/captive-portal/images/eload-logos/meralco-prepaid-logo.png",
      "SKY CABLE": "/captive-portal/images/eload-logos/sky-direct-logo.png",
      "CHERRY PREPA.": "/captive-portal/images/eload-logos/cherry-prepaid-logo.png",
      "CHERRY PREPAID": "/captive-portal/images/eload-logos/cherry-prepaid-logo.png"
    };
    self.logoUrl = function(p){
      p = p || "";
      return self.logo_urls[p] || self.logo_urls[p.toUpperCase()];
    }
    self.active_provider = params.active_provider;
    self.providers = params.providers;

    self.selectProvider = function(provider){
      self.active_provider(null);
      self.active_provider(provider);
    }
  }

  ko.components.register('eload-providers', {
    viewModel: VM,
    template: tpl
  });

});
