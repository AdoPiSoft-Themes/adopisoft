define(function() {
  return function routes(config) {

    var pageTitle = config.brand.page_title;
    var commonOpts = {title: pageTitle, sourceCache: true};
    var routes = [
      {
        id: 'start',
        sourceOnShow: 'app/pages/home.html'
      }
    ];

    return routes.map(function(p) {
      return Object.assign(p, commonOpts); 
    });

  };
});
