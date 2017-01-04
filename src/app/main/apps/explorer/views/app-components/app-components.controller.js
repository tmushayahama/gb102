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

  init();
  var vm = this;

  // Data
  vm.components = [];
  vm.appName = $stateParams.app_name;

  init();

  // Methods
  function init() {
   ExplorerComponentService.getComponentsByType(vm.appName).then(function (data) {
    vm.components = data;
    angular.forEach(vm.components.apps, function (app, key) {
     angular.forEach(app.components, function (component, key) {
      if (component.component_picture_url || component.component_picture_url === 'default.png') {
       component.component_placeholder_style = {background: $rootScope.generateBackgroundPattern()};
      }
     });
    });
    angular.forEach(vm.components.activities, function (app, key) {
     angular.forEach(app.components, function (component, key) {
      if (component.component_picture_url || component.component_picture_url === 'default.png') {
       component.component_placeholder_style = {background: $rootScope.generateBackgroundPattern()};
      }
     });
    });
   });
  }
  //////////

  $rootScope.headerStyle = {background: $rootScope.generateBackgroundPattern()};
  $rootScope.appName = vm.appName;

 }
})();