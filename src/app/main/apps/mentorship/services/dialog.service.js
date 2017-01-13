(function ()
{
 'use strict';

 angular
         .module('app.mentorship')
         .factory('MentorshipDialogService', MentorshipDialogService);

 /** @ngInject */
 function MentorshipDialogService($mdDialog, $document)
 {
  var service = {
   openCardDialog: openCardDialog,
   openAddMentorshipDialog: openAddMentorshipDialog,
   openMentorshipDialog: openMentorshipDialog
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
    templateUrl: 'src/app/main/apps/mentorship/dialogs/card/card-dialog.html',
    controller: 'MentorshipCardDialogController',
    controllerAs: 'vm',
    parent: $document.find('#mentorship'),
    targetEvent: ev,
    clickOutsideToClose: false,
    escapeToClose: true,
    locals: {
     cardId: cardId
    }
   });
  }

  /**
   * Open Add Mentorship dialog
   *
   * @param ev the event which triggered the dialog
   * @param startTabIndex an initial selected tab index
   * @param preselectedData data coming from external diaolog selection tab
   *
   */
  function openAddMentorshipDialog(ev, mentorshipId, startTabIndex, preselectedData) {
   $mdDialog.show({
    templateUrl: 'src/app/main/apps/mentorship/dialogs/add-mentorship/add-mentorship-dialog.html',
    controller: 'MentorshipAddMentorshipDialogController',
    controllerAs: 'vm',
    parent: $document.find('#mentorship'),
    targetEvent: ev,
    clickOutsideToClose: false,
    escapeToClose: true,
    locals: {
     startTabIndex: startTabIndex,
     preselectedData: preselectedData,
     mentorshipId: mentorshipId
    }
   });
  }

  /**
   * Open mentorship as a mentorship
   *
   * @param ev  the event which triggered the dialog
   * @param mentorshipId the mentorship Id
   */
  function openMentorshipDialog(ev, mentorshipId) {
   $mdDialog.show({
    templateUrl: 'src/app/main/apps/mentorships/dialogs/mentorship/mentorship-dialog.html',
    //parent: $document.find('#mentorships'),
    controller: 'MentorshipDialogController',
    controllerAs: 'vm',
    targetEvent: ev,
    clickOutsideToClose: true,
    escapeToClose: true,
    locals: {
     mentorshipId: mentorshipId
    }
   });
  }

  return service;
 }
})();