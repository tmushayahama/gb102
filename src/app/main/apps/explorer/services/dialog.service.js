(function ()
{
 'use strict';

 angular
         .module('app.explorer')
         .factory('DialogService', DialogService);

 /** @ngInject */
 function DialogService($mdDialog, $document)
 {
  var service = {
   openCardDialog: openCardDialog,
   openAddComponentDialog: openAddComponentDialog,
   openComponentDialog: openComponentDialog,
   openComponentSectionDialog: openComponentSectionDialog
  };

  //////////

  // ******************************
  // Internal methods
  // ******************************

  /**
   * Open card dialog
   *
   * @param ev
   * @param cardId
   */
  function openCardDialog(ev, cardId) {
   $mdDialog.show({
    templateUrl: 'src/app/main/apps/explorer/dialogs/card/card-dialog.html',
    controller: 'ExplorerCardDialogController',
    controllerAs: 'vm',
    parent: $document.find('#explorer'),
    targetEvent: ev,
    clickOutsideToClose: false,
    escapeToClose: true,
    locals: {
     cardId: cardId
    }
   });
  }

  /**
   * Open Add Component dialog
   *
   * @param ev the event which triggered the dialog
   * @param startTabIndex an initial selected tab index
   * @param preselectedData data coming from external diaolog selection tab
   *
   */
  function openAddComponentDialog(ev, componentId, startTabIndex, preselectedData) {
   $mdDialog.show({
    templateUrl: 'src/app/main/apps/explorer/dialogs/add-component/add-component-dialog.html',
    controller: 'ExplorerAddComponentDialogController',
    controllerAs: 'vm',
    parent: $document.find('#explorer'),
    targetEvent: ev,
    clickOutsideToClose: false,
    escapeToClose: true,
    locals: {
     startTabIndex: startTabIndex,
     preselectedData: preselectedData,
     componentId: componentId
    }
   });
  }

  /**
   * Open component as a component
   *
   * @param ev  the event which triggered the dialog
   * @param componentId the component Id
   */
  function openComponentDialog(ev, componentId) {
   $mdDialog.show({
    templateUrl: 'src/app/main/apps/components/dialogs/component/component-dialog.html',
    //parent: $document.find('#components'),
    controller: 'ComponentDialogController',
    controllerAs: 'vm',
    targetEvent: ev,
    clickOutsideToClose: true,
    escapeToClose: true,
    locals: {
     componentId: componentId
    }
   });
  }

  /**
   * Open component section for editing purposes
   *
   * @param ev  the event which triggered the dialog
   * @param componentId the component Id
   * @param section the section
   */
  function openComponentSectionDialog(ev, componentId, section) {
   $mdDialog.show({
    templateUrl: 'src/app/main/apps/components/dialogs/component-section/component-section-dialog.html',
    //parent: $document.find('#components'),
    controller: 'ComponentSectionDialogController',
    controllerAs: 'vm',
    targetEvent: ev,
    clickOutsideToClose: true,
    escapeToClose: true,
    locals: {
     componentId: componentId,
     section: section
    }
   });
  }

  return service;
 }
})();