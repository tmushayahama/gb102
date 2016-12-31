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
   openAddComponentDialog: openAddComponentDialog
  };

  //////////

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
   */
  function openAddComponentDialog(ev, startTabIndex) {
   $mdDialog.show({
    templateUrl: 'src/app/main/apps/explorer/dialogs/add-component/add-component-dialog.html',
    controller: 'ExplorerAddComponentDialogController',
    controllerAs: 'vm',
    parent: $document.find('#explorer'),
    targetEvent: ev,
    clickOutsideToClose: false,
    escapeToClose: true,
    locals: {
     startTabIndex: startTabIndex
    }
   });
  }

  return service;
 }
})();