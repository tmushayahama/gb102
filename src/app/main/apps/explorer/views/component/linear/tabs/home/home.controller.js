(function ()
{
 'use strict';

 angular
         .module('app.explorer')
         .controller('ComponentLinearHomeController', ComponentLinearHomeController);

 /** @ngInject */
 function ComponentLinearHomeController(add_component_tabs, ComponentService, DialogService, $stateParams, $rootScope)
 {
  var vm = this;
  //////////
  //
  ////Data
  vm.tabs = add_component_tabs;
  vm.componentId = $stateParams.id;
  ///////////

  //Methods
  vm.openAddComponentDialog = DialogService.openAddComponentDialog;





 }
})();