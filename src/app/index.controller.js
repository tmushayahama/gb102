(function ()
{
 'use strict';

 angular
         .module('fuse')
         .controller('IndexController', IndexController);

 /** @ngInject */
 function IndexController($http, $auth, $rootScope, $state, localStorageService, fuseTheming)
 {
  var vm = this;

  // Data
  vm.themes = fuseTheming.themes;

 }
})();