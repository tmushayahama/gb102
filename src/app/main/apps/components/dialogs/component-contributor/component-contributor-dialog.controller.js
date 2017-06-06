(function ()
{
 'use strict';

 angular
         .module('app.components')
         .controller('ComponentContributorDialogController', ComponentContributorDialogController);

 /** @ngInject */
 function ComponentContributorDialogController(ComponentService, $rootScope, $stateParams, $document, $timeout, $scope, $mdSidenav, $mdDialog, componentId, contribution) {

  var vm = this;

  // Data
  vm.componentId = componentId;
  vm.contribution = contribution;
  //////////

  // Methods
  vm.closeDialog = closeDialog;
  //////////

  init();

  // ******************************
  // Internal methods
  // ******************************

  /**
   * Close Dialog
   */
  function closeDialog()
  {
   $mdDialog.hide();
  }

  /**
   * Initialize
   */
  function init() {
   ComponentService.getComponent(vm.componentId, 0).then(function (data) {
    vm.components = data.components;
    vm.components.newComponentData = angular.copy(vm.defaultComponentData);
   });
  }
 }
})();