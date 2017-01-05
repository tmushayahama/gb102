(function ()
{
 'use strict';

 angular
         .module('app.explorer')
         .controller('AppExplorerComponentsController', AppExplorerComponentsController);

 /** @ngInject */
 function AppExplorerComponentsController($stateParams, ExplorerComponentService, $rootScope)
 {
  var vm = this;

  // Data
  vm.app = {};
  vm.appName = $stateParams.app_name;

  init();

  // Methods
  function init() {
   ExplorerComponentService.getComponentApp(vm.appName).then(function (data) {
    vm.app = data;
    angular.forEach(vm.app.components, function (component) {
     if (component.component_picture_url || component.component_picture_url === 'default.png') {
      component.component_placeholder_style = {background: $rootScope.generateBackgroundPattern()};
     }
    });
   });
  }
  //////////

  $rootScope.headerStyle = {background: $rootScope.generateBackgroundPattern()};
  $rootScope.appName = vm.appName;

 }
})();