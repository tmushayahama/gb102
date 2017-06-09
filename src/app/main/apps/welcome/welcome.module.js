(function ()
{
 'use strict';

 angular
         .module('app.welcome',
                 ['app.components']
                 )
         .config(config);

 /** @ngInject */
 function config(gbConfigProvider, $stateProvider, msApiProvider) {
  var apiUrl = gbConfigProvider.getConfig("apiUrl");

  // State
  $stateProvider.state('app.welcome', {
   url: '/welcome',
   views: {
    'content@app': {
     templateUrl: 'app/main/apps/welcome/welcome.html',
     controller: 'WelcomeController as vm'
    }
   },
   resolve: {
    /*
     DashboardData: function (msApi)
     {
     return msApi.resolve('welcome.server@get');
     }
     */
   },
   bodyClass: 'gb-welcome'
  });

  // Api
  msApiProvider.register('welcome.components', [apiUrl + 'api/components/listformat/:listFormat',
   {
    listFormat: "@listFormat"
   }]);
 }

})();