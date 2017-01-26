(function ()
{
 'use strict';

 angular
         .module('app.explorer')
         .controller('ComponentLinearStoryController', ComponentLinearStoryController);

 /** @ngInject */
 function ComponentLinearStoryController(add_component_tabs, ComponentService, DialogService, $stateParams, $rootScope)
 {
  var vm = this;
  //////////
  //
  ////Data
  vm.tabs = add_component_tabs;
  vm.componentId = $stateParams.id;
  ///////////

  //Methods
  vm.startComponentStoryDialog = DialogService.startComponentStoryDialog;


 }
})();