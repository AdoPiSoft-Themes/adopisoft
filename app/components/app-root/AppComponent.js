define([
  'knockout',
  'rootVM',
  'socket',
  'modal',
  'app/services/config',
  'app/observables/payment',
  'app/components/popup-banner/init_popup_banner',
  'app/components/toast/ToastComponent',
  'app/components/status-nav/StatusNavComponent',
  'app/components/banners/Banners',
  'app/components/sessions-table/SessionsTableComponent',
  'app/components/modal/Modal',
  'app/components/socket-disconnected-alert/SocketDisconnectedAlert',
  'app/components/footer/Footer'
], function (ko, rootVM, socket, modal, config, payment, init_popup_banner) {

  function AppVM() {
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
    this.koDescendantsComplete = function () {
      init_popup_banner();
    };
  }

  ko.components.register('app', {
    viewModel: AppVM,
    template: {require: 'text!app/components/app-root/app-root.html'}
  });

});
