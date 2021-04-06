define(['json!../config.json'], function(config) {

  var pageTitle = config.brand.page_title;
  var commonOpts = {title: pageTitle, sourceCache: true};
  var routes = [
    {id: 'start', sourceOnShow: 'app/pages/home.html'}, 
    {id: 'insert-coin', sourceOnShow: 'app/pages/insert-coin.html'}, 
  ];

  return routes.map(function(p) {
    return Object.assign(p, commonOpts); 
  });

});
