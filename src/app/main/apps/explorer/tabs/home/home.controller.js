(function ()
{
 'use strict';

 angular
         .module('app.explorer')
         .controller('ExplorerComponentsHomeTabController', ExplorerComponentsHomeTabController);

 /** @ngInject */
 function ExplorerComponentsHomeTabController(ExplorerComponentService, $rootScope)
 {
  var vm = this;

  // Data


  $rootScope.headerStyle = {background: $rootScope.generateBackgroundPattern()};
  $rootScope.appName = "Explorer";


  // Methods
  //////////
 }
})();