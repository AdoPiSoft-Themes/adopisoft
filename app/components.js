define([
  'knockout',
  'rootVM',
  'socket',
  'sounds',
  'modal',
  'toast',
  'http',
  'wifiRates',
  'sessions',
  'app/utils',
  'getElementsByClassName',
  'app/services/config',
  'app/observables/payment',
  'app/observables/customer',
  'app/observables/device',
  'app/observables/session'
  // eload components
  //'app/components/eload-customer-recent/EloadCustomerRecent',
  //'app/components/eload-payment/EloadPayment',
  //'app/components/eload-processing/EloadProcessing',
  //'app/components/eload-products/EloadProducts',
  //'app/components/eload-providers/EloadProviders',
  //'app/components/eload-to-pay/EloadToPay'
], function (ko, rootVM, socket, sounds, modal, toast, http, rates, sessions, Utils, getElementsByClassName, config, payment, customer, device, Session) {

  ko.components.register('app', {
    viewModel: function () {
      this.favicon = ko.observable(config.favicon());
      this.pageTitle = ko.observable(config.pageTitle());
      this.styles = ko.observableArray(config.styles());

      this.buyWifi = function () {
        payment.intent('wifi');
        this.navigate('select-coinslot-page');
      };

      this.buyVoucher = function () {
        this.intent('buy_voucher');
        this.navigate('select-coinslot-page');
      };

      this.buyEload = function () {
        this.navigate('buy-eload-page');
      };

      rootVM.page('home-page');

      this.showAlert = false;
      this.socket = socket();
      this.socket.on('connect', function () {
        if (this.showAlert) {
          modal.hide();
          this.showAlert = false;
        }
      });
      this.socket.on('disconnect', function () {
        if (!this.showAlert) {
          modal.show('socket-disconnected-alert');
          this.showAlert = true;
        }
      });
    },
    template: {require: 'text!app/components/app-root/app-root.html'}
  });

  ko.components.register('banners', {
    viewModel: function () {
      var self = this;

      var banner_field = config.findField('banners', 'banners');
      var slogan_field = config.findField('page_properties', 'banner_text');
      var transition_s = parseInt(config.findField('banners_transition', 'banner_interval') || 0) * 1000;


      var index = 0;
      self.src = ko.observable('');
      self.bannerText = slogan_field;
      self.imgUrls = Utils.array.map(banner_field, function (url) {
        return encodeURI(url);
      });
      self.changeImage = function () {
        if (index === self.imgUrls.length) index = 0;
        self.src(self.imgUrls[index]);
        index++;
        if (self.imgUrls.length > 1) {
          self._timeout = setTimeout(function () {
            self.changeImage();
          }, transition_s);
        }
      };
      self.koDescendantsComplete = function () {
        if (self.imgUrls.length > 0) self.changeImage();
        sounds.background.play();
      };
      self.dispose = function () {
        if (self._timeout) clearTimeout(self._timeout);
        self._timeout = null;
        sounds.background.stop();
      };
    },
    template: {require: 'text!app/components/banners/banners.html'}
  });

  ko.components.register('buy-wifi-or-eload', {
    viewModel: function () {
      var self = this;
      this.loading = ko.observable(false);
      this.eloadLoading = ko.observable(false);
      this.customer = customer;

      this.showBuyVoucherBtn = ko.observable(config.findField('buttons', 'button_buy_voucher'));
      this.showBuyEloadBtn = ko.observable(config.findField('buttons', 'button_buy_eload'));
      this.showBuyWifiBtn = ko.observable(config.findField('buttons', 'button_buy_wifi'));

      this.buyWifi = function () {
        this.loading(true);
        payment.intent('wifi');
        payment.isVoucher(false);
        payment.rateType('');
        rootVM.navigate('buy-wifi-buttons');
      };

      this.buyVoucher = function () {
        this.loading(true);
        payment.intent('wifi');
        payment.isVoucher(true);
        payment.rateType('');
        rootVM.navigate('buy-wifi-buttons');
      };

      this.buyEload = function () {
        this.eloadLoading(true);
        rootVM.navigate('buy-eload-page');
      };

      this.topupWallet = function() {
        self.loading(true);
        payment.isVoucher(false);
        payment.intent('wallet_topup');
        payment.rateType('wallet_topup');
        rootVM.navigate('select-coinslot-page');
      };

      this.koDescendantsComplete = function () {
        rootVM.showingStatusNav(true);
        rootVM.showingBanners(true);
        rootVM.showingSessionsTable(true);
      };

      customer.fetch(function() { });

    },
    template: {require: 'text!app/components/buy-wifi-or-eload/buy-wifi-or-eload.html'}
  });

  ko.components.register('device-info', {
    viewModel: function() {
      this.device = device;
    },
    template: {require: 'text!app/components/device-info/device-info.html'}
  });

  ko.components.register('footer', {
    viewModel: function () {
      this.footer_text = config.findField('page_properties', 'footer_text');
      this.footer_url = config.findField('page_properties', 'footer_url');
    },
    template: {require: 'text!app/components/footer/footer.html'}
  });

  ko.components.register('internet-status', {
    viewModel: function () {
      var self = this;
      self.online = ko.observable(true);
      http.systemNotifications(function (err, res) {
        self.online(res.is_online);
      });
    },
    template: {require: 'text!app/components/internet-status/internet-status.html'}
  });

  ko.components.register('modal', {
    viewModel: function () {
      var self = this;
      self.modalComponent = ko.observable('');
      self.modalOptions = ko.observable({});
      self.show = function(component, opts) {
        self.modalComponent(component);
        opts = opts || {};
        opts.close = self.hide;
        self.modalOptions(opts);
      };
      self.hide = function() {
        self.modalComponent(null);
      };
      return modal.init(self);
    },
    template: {require: 'text!app/components/modal/modal.html'}
  });

  ko.components.register('progress-bar', {
    viewModel: function (params) {
      var self = this;
      self.klass = ko.pureComputed(function() {
        return self.current() < 10 ? 'progress-bar-danger' : 'progress-bar-warning';
      });
      self.current = params.current;
      self.total = params.total;
      self.percent = ko.pureComputed(function () {
        return self.current() / self.total() * 100;
      });
      self.interval = setInterval(function () {
        self.tick();
      }, 1000);
      self.tick = function () {
        self.current(self.current() - 1);
      };
      self.dispose = function() {
        clearInterval(self.interval);
      };
    },
    template: {require: 'text!app/components/progress-bar/progress-bar.html'}
  });

  ko.components.register('seconds-format', {
    viewModel: function (params) {
      params = params || {seconds: ko.observable(0)};
      this.value = ko.pureComputed(function () {
        var short_or_long = params.format || 'short';
        if (short_or_long !== 'short') return Utils.seconds.long(params.seconds());
        else return Utils.seconds.short(params.seconds());
      });
    },
    template: '<span data-bind="text: value"></span>'
  });

  ko.components.register('sessions-table', {
    viewModel: function() {
      this.sessions = sessions.get();
      this.koDescendantsComplete = function () {
        sessions.fetch();
      };
      this.dispose = function () {
        sessions.stopSync();
      };
    },
    template: {require: 'text!app/components/sessions-table/sessions-table.html'}
  });

  ko.components.register('socket-disconnected-alert', {
    template: {require: 'text!app/components/socket-disconnected-alert/socket-disconnected-alert.html'}
  });

  ko.components.register('start-pause-buttons', {
    viewModel: function() {
      var self = this;
      self.starting = ko.observable(false);
      self.pausing = ko.observable(false);
      self.sessions = sessions;
      self.pauseSession = function () {
        var running = sessions.runningSession();
        self.setPausing();
        running.pauseSession();
      };
      self.startSession = function () {
        var available = sessions.available();
        self.setStarting();
        available.startSession();
      };
      self.allowPause = ko.pureComputed(function () {
        var s = sessions.runningSession();
        return s && s.allow_pause() && !self.pausing();
      });
      self.setStarting = function () {
        self.clearStarting();
        self.starting(true);
        self._startTimeout = setTimeout(function() {
          self.starting(false);
        }, 5000);
      };
      self.clearStarting = function() {
        if(self._startTimeout) clearTimeout(self._startTimeout);
        self._startTimeout = null;
      };
      self.setPausing = function () {
        self.clearPausing();
        self.pausing(true);
        self._pauseTimeout = setTimeout(function() {
          self.pausing(false);
        }, 5000);
      };
      self.clearPausing = function() {
        if(self._pauseTimeout) clearTimeout(self._pauseTimeout);
        self._pauseTimeout = null;
      };
      self.dispose = function () {
        self.clearStarting();
        self.clearPausing();
      };
    },
    template: {require: 'text!app/components/start-pause-buttons/start-pause-buttons.html'}
  });

  ko.components.register('status-nav', {
    viewModel: function () {
      var self = this;
      var connectedIcon = config.findField('wifi_icons', 'wifi_connected_icon');
      var disconnectedIcon = config.findField('wifi_icons', 'wifi_disconnected_icon');
      this.connected = ko.pureComputed(function () {
        return sessions.hasRunning();
      });
      this.icon_src = ko.pureComputed(function() {
        return self.connected() ? connectedIcon : disconnectedIcon;
      });
      this.summary = ko.pureComputed(function () {
        return sessions.summary() || 'Disconnected';
      });
    },
    template: {require: 'text!app/components/status-nav/status-nav.html'}
  });

  ko.components.register('toast', {
    viewModel: function ToastVM() {

      var messages = ko.observableArray([]);

      function formatText(text) {
        try{
          text = text.replace('toast.error.', '');
          text = text.replace('toast.success.', '');
          text = text.replace('toast.warning.', '');
          text = text.replaceAll('_', ' ');
        }catch(e) { console.log(e); }
        return text;
      }

      function Message(type, title, message) {
        var self = this;
        this.type = ko.observable(type);
        this.title = ko.observable(title);
        this.message = ko.observable(formatText(message));
        this.show = function () {
          messages.push(this);
          setTimeout(function () {
            self.remove();
          }, 5000);
        };
        this.remove = function () {
          messages.remove(self);
        };
      }

      function applyToastStyles(el) {
        el.style.zIndex = 999999;
        el.style.position = 'fixed';
        el.style.bottom = '0';
        el.style.right = '15px';
        el.style.width = '100%';
        el.style.maxWidth = '300px';
        el.style.paddingLeft = '30px';
        el.style.paddingRight = '30px';
      }

      function findToasts() {
        try {
          var toasts = document.getElementsByClassName('toast');
          return toasts;
        } catch(e) {
          var toastsCon = document.getElementById('toasts');
          return getElementsByClassName('toast', '*', toastsCon);
        }
      }


      this.messages = messages;
      this.success = function (title, message) {
        var m = new Message('success', title, message);
        m.show();
      };
      this.error = function (title, message) {
        var m = new Message('error', title, message);
        m.show();
      };
      this.showToast = function (element, index) {
        var toasts = findToasts();
        var el = toasts[index];
        applyToastStyles(el);
        var totalHeight = Utils.array.reduce(toasts, function (sum, t) {
          return sum + t.offsetHeight;
        }, 0) - el.offsetHeight;
        el.style.bottom = totalHeight + 'px';
      };
      toast.init(this);
    },
    template: {require: 'text!app/components/toast/toast.html'}
  });

  ko.components.register('voucher-form', {
    viewModel: function(code) {
      var self = this;
      if (code) self.value = (typeof code === 'function') ? code : ko.observable(code);
      else self.value = ko.observable('');
      self.activate = function() {
        var code = self.value();
        http.activateVoucher(code, function(err, data) {
          if (err) return http.catchError(err);
          var s = new Session(data);
          sessions.get().push(s);
          toast.success('Voucher activated successfully!');
          self.value('');
          rootVM.navigate('home-page');
        });
      };
    },
    template: {require: 'text!app/components/voucher-form/voucher-form.html'}
  });

  ko.components.register('buy-wifi-buttons', {
    viewModel: function () {
      var self = this;
      self.sampleText = ko.observable('txt-1');
      self.rates = rates;
      self.loading = ko.observable(false);
      self.koDescendantsComplete = function () {
        rootVM.showingStatusNav(true);
        rootVM.showingBanners(true);
        rootVM.showingSessionsTable(true);

        if (!rates.time_or_data_rates()) {
          if (rates.time_rates() && !rates.data_rates()) self.selectRate('time');
          if (!rates.time_rates() && rates.data_rates()) self.selectRate('data');
        } else {
          self.selectRate('time_or_data');
        }

      };
      self.selectRate = function (type) {
        self.loading(true);
        payment.rateType(type);
        rootVM.navigate('select-coinslot-page');
      };

    },
    template: {require: 'text!app/components/buy-wifi-buttons/buy-wifi-buttons.html'}
  });

});
