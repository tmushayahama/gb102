(function ()
{
 'use strict';

 angular
         .module('fuse')
         .controller('IndexController', IndexController);

 /** @ngInject */
 function IndexController(api, $http, $auth, $rootScope, $state, localStorageService, fuseTheming)
 {
  var vm = this;

  // Data
  vm.themes = fuseTheming.themes;



  api.config.apps.get({},
          function (data)
          {
           $rootScope.commonData = data;
           console.error(data);
          },
          function (response)
          {
           console.error(response);
          }
  );

 }
})();