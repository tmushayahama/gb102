(function ()
{
 'use strict';

 angular
         .module('app.components')
         .controller('ComponentContributionDialogController', ComponentContributionDialogController);

 /** @ngInject */
 function ComponentContributionDialogController(ComponentService, $rootScope, $stateParams, $document, $timeout, $scope, $mdSidenav, $mdDialog, componentId, contributorId) {

  var vm = this;

  // Data
  vm.componentId = componentId;
  vm.contributorId = contributorId;
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
   ComponentService.getComponentContribution(vm.componentId, vm.contribution.contributor_id).then(function (data) {
    vm.contribution = data.contribution;
   });
  }
 }
})();