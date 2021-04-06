define(['./utils/config'], function(config) {

  //var commonOpts = {title: config.pageTitle(), sourceCache: true};
  //var routes = [
  //  {id: 'start', sourceOnShow: 'app/pages/home.html'}, 
  //  {id: 'insert-coin', sourceOnShow: 'app/pages/insert-coin.html'}, 
  //];

  //return routes.map(function(p) {
  //  return Object.assign(p, commonOpts); 
  //});

  return [
    {page: 'home', component: 'home-page'},
    {page: 'insert-coin', component: 'insert-coin'}
  ];
});
