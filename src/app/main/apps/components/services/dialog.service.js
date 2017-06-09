(function ()
{
 'use strict';

 angular
         .module('app.components')
         .factory('DialogComponentService', DialogComponentService);

 /** @ngInject */
 function DialogComponentService($mdDialog, $document) {

  var service = {
   openCardDialog: openCardDialog,
   openAddComponentDialog: openAddComponentDialog,
   openAddComponentsDialog: openAddComponentsDialog,
   openComponentDialog: openComponentDialog,
   openComponentSectionDialog: openComponentSectionDialog,
   openComponentNotesDialog: openComponentNotesDialog,
   openComponentPinboardDialog: openComponentPinboardDialog,
   openComponentListboardDialog: openComponentListboardDialog,
   openComponentChatsDialog: openComponentChatsDialog,
   openComponentDiscussionsDialog: openComponentDiscussionsDialog,
   openComponentGraphsDialog: openComponentGraphsDialog,
   openComponentCalendarDialog: openComponentCalendarDialog,
   startComponentStoryDialog: startComponentStoryDialog,
   openComponentContributionDialog: openComponentContributionDialog,
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
    templateUrl: 'app/main/apps/explorer/dialogs/card/card-dialog.html',
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
    templateUrl: 'app/main/apps/explorer/dialogs/add-component/add-component-dialog.html',
    controller: 'ExplorerAddComponentDialogController',
    controllerAs: 'vm',
    parent: angular.element($document.body),
    targetEvent: ev,
    clickOutsideToClose: false,
    escapeToClose: true,
    //disableParentScroll: false,
    locals: {
     startTabIndex: startTabIndex,
     preselectedData: preselectedData,
     componentId: componentId
    }
   });
  }

  /**
   *  Adds components in bulk
   *
   * @param {type} ev event of the dialog
   * @param {type} componentId the starting parent component id
   * @returns {undefined}
   */
  function openAddComponentsDialog(ev, componentId, contents) {
   $mdDialog.show({
    templateUrl: 'app/main/apps/explorer/dialogs/add-components/add-components-dialog.html',
    controller: 'ExplorerAddComponentsDialogController',
    controllerAs: 'vm',
    // parent: $document.find('#explorer'),
    targetEvent: ev,
    clickOutsideToClose: false,
    escapeToClose: true,
    locals: {
     componentId: componentId,
     contents: contents
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
    templateUrl: 'app/main/apps/components/dialogs/component/component-dialog.html',
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
    templateUrl: 'app/main/apps/components/dialogs/component-section/component-section-dialog.html',
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

  /**
   * Open component chat for editing purposes
   *
   * @param ev  the event which triggered the dialog
   * @param componentId the component Id
   * @param chat the chat
   */
  function openComponentChatsDialog(ev, componentId, chats) {
   $mdDialog.show({
    templateUrl: 'app/main/apps/components/dialogs/component-chat/component-chats-dialog.html',
    //parent: $document.find('#components'),
    controller: 'ComponentChatsDialogController',
    controllerAs: 'vm',
    targetEvent: ev,
    clickOutsideToClose: true,
    escapeToClose: true,
    locals: {
     componentId: componentId,
     chats: chats
    }
   });
  }

  /**
   * Open component calendar for editing purposes
   *
   * @param ev  the event which triggered the dialog
   * @param componentId the component Id
   * @param calendar the calendar
   */
  function openComponentCalendarDialog(ev, componentId, calendars) {
   $mdDialog.show({
    templateUrl: 'app/main/apps/components/dialogs/component-calendar/component-calendar-dialog.html',
    //parent: $document.find('#components'),
    controller: 'ComponentCalendarsDialogController',
    controllerAs: 'vm',
    targetEvent: ev,
    clickOutsideToClose: true,
    escapeToClose: true,
    locals: {
     componentId: componentId,
     calendars: calendars
    }
   });
  }

  /**
   * Open component discussion for editing purposes
   *
   * @param ev  the event which triggered the dialog
   * @param componentId the component Id
   * @param discussion the discussion
   */
  function openComponentDiscussionsDialog(ev, componentId, discussions) {
   $mdDialog.show({
    templateUrl: 'app/main/apps/components/dialogs/component-discussion/component-discussions-dialog.html',
    //parent: $document.find('#components'),
    controller: 'ComponentDiscussionsDialogController',
    controllerAs: 'vm',
    targetEvent: ev,
    clickOutsideToClose: true,
    escapeToClose: true,
    locals: {
     componentId: componentId,
     discussions: discussions
    }
   });
  }

  /**
   * Open component graph for editing purposes
   *
   * @param ev  the event which triggered the dialog
   * @param componentId the component Id
   * @param graph the graph
   */
  function openComponentGraphsDialog(ev, componentId, graphs) {
   $mdDialog.show({
    templateUrl: 'app/main/apps/components/dialogs/component-graph/component-graphs-dialog.html',
    //parent: $document.find('#components'),
    controller: 'ComponentGraphsDialogController',
    controllerAs: 'vm',
    targetEvent: ev,
    clickOutsideToClose: true,
    escapeToClose: true,
    locals: {
     componentId: componentId,
     graphs: graphs
    }
   });
  }

  /**
   * Open component chat for editing purposes
   *
   * @param ev  the event which triggered the dialog
   * @param componentId the component Id
   * @param chat the chat
   */
  function openComponentListboardDialog(ev, componentId, listboard) {
   $mdDialog.show({
    templateUrl: 'app/main/apps/components/dialogs/component-listboard/component-listboard-dialog.html',
    //parent: $document.find('#components'),
    controller: 'ComponentListboardDialogController',
    controllerAs: 'vm',
    targetEvent: ev,
    clickOutsideToClose: true,
    escapeToClose: true,
    locals: {
     componentId: componentId,
     listboard: listboard
    }
   });
  }

  /**
   * Open component note for editing purposes
   *
   * @param ev  the event which triggered the dialog
   * @param componentId the component Id
   * @param note the note
   */
  function openComponentNotesDialog(ev, componentId, notes) {
   $mdDialog.show({
    templateUrl: 'app/main/apps/components/dialogs/component-note/component-notes-dialog.html',
    //parent: $document.find('#components'),
    controller: 'ComponentNotesDialogController',
    controllerAs: 'vm',
    targetEvent: ev,
    clickOutsideToClose: true,
    escapeToClose: true,
    locals: {
     componentId: componentId,
     notes: notes
    }
   });
  }

  /**
   * Open component chat for editing purposes
   *
   * @param ev  the event which triggered the dialog
   * @param componentId the component Id
   * @param chat the chat
   */
  function openComponentPinboardDialog(ev, componentId, pinboard) {
   $mdDialog.show({
    templateUrl: 'app/main/apps/components/dialogs/component-pinboard/component-pinboard-dialog.html',
    //parent: $document.find('#components'),
    controller: 'ComponentPinboardDialogController',
    controllerAs: 'vm',
    targetEvent: ev,
    clickOutsideToClose: true,
    escapeToClose: true,
    locals: {
     componentId: componentId,
     pinboard: pinboard
    }
   });
  }

  /**
   * Starts a story slide from componentId
   *
   * @param {type} ev
   * @param {type} componentId
   * @returns {undefined}
   */
  function startComponentStoryDialog(ev, componentId) {
   $mdDialog.show({
    templateUrl: 'app/main/apps/components/dialogs/component-story/component-story-dialog.html',
    controller: 'ComponentStoryDialogController',
    controllerAs: 'vm',
    // parent: $document.find('#explorer'),
    targetEvent: ev,
    clickOutsideToClose: false,
    escapeToClose: true,
    locals: {
     componentId: componentId
    }
   });
  }

  /**
   * Open component contributor for editing purposes
   *
   * @param ev  the event which triggered the dialog
   * @param componentId the component Id
   * @param contributor the contributor
   */
  function openComponentContributionDialog(ev, componentId, contributorId) {
   $mdDialog.show({
    templateUrl: 'app/main/apps/components/dialogs/component-contribution/component-contribution-dialog.html',
    //parent: $document.find('#components'),
    controller: 'ComponentContributionDialogController',
    controllerAs: 'vm',
    targetEvent: ev,
    clickOutsideToClose: true,
    escapeToClose: true,
    locals: {
     componentId: componentId,
     contributorId: contributorId
    }
   });
  }

  return service;
 }
})();