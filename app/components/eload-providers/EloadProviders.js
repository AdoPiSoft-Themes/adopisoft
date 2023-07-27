define([
  'knockout'
], function(ko) {

  function VM(params) {
    var self = this;
    self.logo_urls = {
      Globe: '/public/eload-logos/globe-logo.png',
      SMART: '/public/eload-logos/smart-logo.png',
      SUN: '/public/eload-logos/sun-logo.png',
      TNT: '/public/eload-logos/tnt-logo.png',
      TM: '/public/eload-logos/tm-logo.png',
      DITO: '/public/eload-logos/dito-logo.png',
      CIGNAL: '/public/eload-logos/cignal-logo.png',
      GSAT: '/public/eload-logos/gsat-logo.png',
      MERALCO: '/public/eload-logos/meralco-prepaid-logo.png',
      'SKY CABLE': '/public/eload-logos/sky-direct-logo.png',
      'CHERRY PREPA.': '/public/eload-logos/cherry-prepaid-logo.png',
      'CHERRY PREPAID': '/public/eload-logos/cherry-prepaid-logo.png',
      'GCASH CASH-IN': '/public/eload-logos/gcash_cash_in_logo.png',
      'MAYA CASH-IN': '/public/eload-logos/maya_cash_in_logo.png'
    };
    
    self.logoUrl = function(p) {
      p = p || '';
      return self.logo_urls[p] || self.logo_urls[p.toUpperCase()];
    };
    self.active_provider = params.active_provider;
    self.providers = params.providers;

    self.selectProvider = function(provider) {
      self.active_provider(null);
      self.active_provider(provider);
    };
  }

  ko.components.register('eload-providers', {
    viewModel: VM,
    template: {require: 'text!app/components/eload-providers/eload-providers.html'}
  });

});
