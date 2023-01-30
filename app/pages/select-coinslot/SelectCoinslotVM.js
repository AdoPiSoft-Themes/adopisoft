define([
  'knockout',
  'rootVM',
  'toast',
  'http',
  'app/observables/payment',
  'app/observables/device',
  'app/utils/array.map',
  'app/utils/array.find',
  'translator',
  'modal',
  'app/components/wallet-prompt/WalletPrompt'
], function (ko, rootVM, toast, http, payment, device, map, find, translator) {

  return function () {
    var self = this;

    self.selectedId = ko.observable('');
    self.loading = ko.observable(true);
    self.coinslots = ko.observableArray([]);

    self.koDescendantsComplete = function () {
      rootVM.showingStatusNav(true);
      rootVM.showingBanners(true);
      rootVM.showingSessionsTable(false);

      var intent = payment.intent();
      http.fetchCoinslots(intent, function(err, coinslots) {
        if (err) return http.catchError(err);

        coinslots = map(coinslots, function(c) {
          c.html_details = '<h3>' + c.alias + '</h3>'
          if (c.description && c.description.length) {
            c.html_details = c.html_details + '<hr style="border-top:1px solid white;">' + c.description
          }

          return c
        })
        self.coinslots(coinslots);
        self.loading(false);

        if (coinslots.length === 1) {
          self.selectCoinslot(coinslots[0].id);
        }
      });
    };

    self.selectCoinslot = function(coinslot_id) {
      var coinslot = find(self.coinslots(), function(c) {
        return c.id === coinslot_id
      }) || {}
      if (coinslot.is_offline) {
        return toast.error(translator.print('COINSLOT_IS_DOWN'))
      }

      self.selectedId(coinslot_id);
      payment.coinslotId(coinslot_id);

      self.loading(true);
      var intent = payment.intent()
      var params = {
        coinslot_id: coinslot_id,
        is_voucher: payment.isVoucher()
      };
      if(intent === 'wifi') {
        rootVM.navigate('buy-wifi-buttons');
      } else {
        params.type = intent
        var opts = payment.eloadOptions();
        params.provider_id = opts.provider_id;
        params.account_number = opts.account_number;
        params.product_keyword = opts.product_keyword;

        http.queForPayment(params, function(err) {
          if (err) {
            http.catchError(err);
            self.loading(false);
          } else {
            device.is_paying(true);
          }
        });
      }
      
    };
  };

});
