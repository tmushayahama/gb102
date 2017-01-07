(function ()
{
 'use strict';

 angular
         .module('app.explorer')
         .controller('AppExplorerComponentsController', AppExplorerComponentsController);

 /** @ngInject */
 function AppExplorerComponentsController(add_component_tabs, $stateParams, ExplorerComponentService, DialogService, $rootScope)
 {
  var vm = this;

  // Data
  vm.tabs = add_component_tabs;
  /////////

  //Methods
  vm.app = {};
  vm.appName = $stateParams.app_name;

  init();

  // Methods
  vm.openAddComponentDialog = openAddComponentDialog;

  function openAddComponentDialog(ev, componentId, startTabIndex) {
   var preselectedData = {
    selectedApp: vm.app.appType
   };
   DialogService.openAddComponentDialog(ev, componentId, startTabIndex, preselectedData);
  }


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