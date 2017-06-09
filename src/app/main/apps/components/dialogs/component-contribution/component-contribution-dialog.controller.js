(function ()
{
 'use strict';

 angular
         .module('app.components')
         .controller('ComponentContributionDialogController', ComponentContributionDialogController);

 /** @ngInject */
 function ComponentContributionDialogController(ComponentService, $rootScope, $document, $timeout, $scope, $mdSidenav, $mdDialog, contributionId) {

  var vm = this;

  // Data
  vm.contribution;
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
   ComponentService.getComponentContribution(contributionId).then(function (data) {
    vm.contribution = data.contribution;
   });
  }
 }
})();