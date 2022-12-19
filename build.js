({
  baseUrl: './',
  name: "main",
  out: 'app.bundle.js',
  inlineJSON: false,
  inlineText: true,
  optimize: "uglify",
  preserveLicenseComments: false,
  wrap: true,
  paths:   {
    text:  './libs/requirejs/text-2.0.16',
    json:  './libs/requirejs/json-0.4.0',
    css: './libs/requirejs/css-0.3.1.min',
    socketIO: './libs/socket.io/socket.io-2.1.1.min',
    knockout: './libs/knockout/knockout-latest',
    howler: './libs/howler/howler.core.min',
    domready: './libs/domready',
    clipboard: './libs/clipboard.min',
    getElementsByClassName: './libs/polyfills/getElementsByClassName',

    // app services
    timerConfig: './app/services/timerConfig',
    toast: './app/services/toast',
    modal: './app/services/modal',
    http: './app/services/http',
    redirect: './app/services/redirect',
    socket: './app/services/socket',
    sounds: './app/services/sounds',
    translator: './app/services/translator',
    sessions: './app/services/sessions',
    wifiRates: './app/services/wifiRates',
    rootVM: './app/root/RootVM'
  },
  packages: [
    './app/bindings',
    './app/pages'
  ]
})