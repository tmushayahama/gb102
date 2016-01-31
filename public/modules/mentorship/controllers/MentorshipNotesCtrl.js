var mentorshipNotesCtrl = function (
        MentorshipNotesManager,
        $scope,
        $state,
        $stateParams,
        $http,
        $rootScope,
        $location,
        $uibModal,
        $log,
        $filter) {

 var vm = this;
 vm.mentorshipId = $stateParams.mentorshipId;
 vm.mentorshipNotesCopy;
 vm.mentorshipNotesManager = new MentorshipNotesManager();
 vm.noteFormDisplay = false;

 vm.defaultMentorshipNoteData = {
  mentorshipId: $stateParams.mentorshipId,
  privacy: 0
 }
 vm.newMentorshipNoteData = angular.copy(vm.defaultMentorshipNoteData);

 vm.showNoteForm = function () {
  vm.noteFormDisplay = true;
 };

 vm.createMentorshipNote = function (data) {
  vm.mentorshipNotesManager.createMentorshipNote(data).then(function (response) {
   vm.noteFormDisplay = false;
   vm.newMentorshipNoteData = angular.copy(vm.defaultMentorshipNoteData);
   vm.mentorshipNotesCopy = angular.copy(vm.mentorshipNotesManager.mentorshipNotes);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editMentorshipNote = function (data) {
  vm.mentorshipNotesManager.editMentorshipNote(data).then(function (response) {
   vm.noteFormDisplay = false;
   vm.newMentorshipNoteData = angular.copy(vm.defaultMentorshipNoteData);
   vm.mentorshipNotesCopy = angular.copy(vm.mentorshipNotesManager.mentorshipNotes);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editMentorshipNoteSections = {
  details: function (mentorshipNoteId, detail) {
   var mentorshipNoteData = {
    mentorshipNoteId: mentorshipNoteId,
    title: detail.title,
    description: detail.description
   };
   vm.editMentorshipNote(mentorshipNoteData);
  }
 }

 vm.cancelMentorshipNote = function (form) {
  vm.noteFormDisplay = false;
  vm.newMentorshipNoteData = angular.copy(vm.defaultMentorshipNoteData)
  if (form) {
   form.$setPristine();
   form.$setUntouched();
  }
 };

 vm.revertMentorshipNote = function (mentorshipNote, mentorshipNoteCopy) {
  mentorshipNote = mentorshipNoteCopy;
  /*
   $filter('filter')
   (vm.mentorshipNotesManager.mentorshipNotes, {id: mentorshipNoteId}, true)[0]
   = angular.copy($filter('filter')
   (vm.mentorshipNotesCopy, {id: mentorshipNoteId}, true)[0]);
   if (mentorshipNote.length && mentorshipNoteCopy.length) {
   // vm.mentorshipNotesManager.mentorshipNotes angular.copy(vm.mentorshipNotesCopy);
   }
   */
 };






 vm.editedNote = null;

 $scope.$watch(angular.bind(this, function () {
  return vm.mentorshipNotes;
 }), function () {
  //vm.remainingCount = filterFilter(mentorshipNotes, {completed: false}).length;
  vm.doneCount = vm.mentorshipNotesManager.mentorshipNotes.length - vm.remainingCount;
  vm.allChecked = !vm.remainingCount;
  //MentorshipNoteService.put(vm.mentorshipNotes);
 }, true);
 /*
  $scope.$watch(angular.bind(this, function () {
  return vm.location.path();
  }), function (path) {
  vm.statusFilter = (path === '/active') ?
  {completed: false} : (path === '/completed') ?
  {completed: true} : null;
  });
  */




 vm.editNote = function (mentorshipNote) {
  vm.editedNote = mentorshipNote;
  // Clone the original mentorshipNote to restore it on demand.
  vm.originalNote = angular.copy(mentorshipNote);
 };


 vm.doneEditing = function (mentorshipNote) {
  vm.editedNote = null;
  mentorshipNote.title = mentorshipNote.title.trim();

  if (!mentorshipNote.title) {
   vm.removeNote(mentorshipNote);
  }
 };

 vm.openMentorshipNote = function (mentorshipNote) {
  var modalInstance = $uibModal.open({
   animation: true,
   templateUrl: 'mentorship-note-modal.html',
   controller: 'MentorshipNoteCtrl as mentorshipNoteCtrl',
   backdrop: 'static',
   size: 'xl',
   resolve: {
    mentorshipNoteData: function () {
     return mentorshipNote;
    }
   }
  });

  modalInstance.result.then(function (selectedItem) {
   $scope.selected = selectedItem;
  }, function () {
   $log.info('Modal dismissed at: ' + new Date());
  });
 };



 //--------init------
 vm.mentorshipNotesManager.getMentorshipNotes(vm.mentorshipId);
};


mentorshipNotesCtrl.$inject = [
 'MentorshipNotesManager',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$uibModal',
 '$log',
 '$filter'];

angular.module("app.mentorship").controller('MentorshipNotesCtrl', mentorshipNotesCtrl);
