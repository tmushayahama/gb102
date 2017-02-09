(function ()
{
 'use strict';

 angular
         .module('app.explorer')
         .controller('ComponentLinearFurnitureController', ComponentLinearFurnitureController);

 /** @ngInject */
 function ComponentLinearFurnitureController(ComponentService, DialogComponentService, $stateParams, $rootScope)
 {
  var vm = this;
//DATA
  vm.notes = [];
  vm.componentId = $stateParams.id;
  //////////
  //METHODS
  vm.openComponentPinboardDialog = DialogComponentService.openComponentPinboardDialog;
  vm.openComponentPinboardDialog = DialogComponentService.openComponentPinboardDialog;
  vm.openComponentListboardDialog = DialogComponentService.openComponentListboardDialog;
  vm.openComponentChatsDialog = DialogComponentService.openComponentChatsDialog;
  vm.openComponentDiscussionsDialog = DialogComponentService.openComponentDiscussionsDialog;
  vm.openComponentGraphsDialog = DialogComponentService.openComponentGraphsDialog;
  vm.openComponentCalendarDialog = DialogComponentService.openComponentCalendarDialog;
  vm.startComponentStoryDialog = DialogComponentService.startComponentStoryDialog;
  //////////
  init();
  /**
   * Initialize
   */
  function init() {
   ComponentService.getComponent(vm.componentId, 0).then(function (data) {
    vm.notes = data.components;
    vm.notes.newComponentData = angular.copy(vm.defaultComponentData);
   });
  }
 }
})();