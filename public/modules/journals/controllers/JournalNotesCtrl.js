var journalNotesCtrl = function (
        JournalNotesManager,
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
 vm.journalId = $stateParams.journalId;
 vm.journalNotesCopy;
 vm.journalNotesManager = new JournalNotesManager();
 vm.noteFormDisplay = false;

 vm.defaultJournalNoteData = {
  journalId: $stateParams.journalId,
  privacy: 0
 }
 vm.newJournalNoteData = angular.copy(vm.defaultJournalNoteData);

 vm.showNoteForm = function () {
  vm.noteFormDisplay = true;
 };

 vm.createJournalNote = function (data) {
  vm.journalNotesManager.createJournalNote(data).then(function (response) {
   vm.noteFormDisplay = false;
   vm.newJournalNoteData = angular.copy(vm.defaultJournalNoteData);
   vm.journalNotesCopy = angular.copy(vm.journalNotesManager.journalNotes);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editJournalNote = function (data) {
  vm.journalNotesManager.editJournalNote(data).then(function (response) {
   vm.noteFormDisplay = false;
   vm.newJournalNoteData = angular.copy(vm.defaultJournalNoteData);
   vm.journalNotesCopy = angular.copy(vm.journalNotesManager.journalNotes);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editJournalNoteSections = {
  details: function (journalNoteId, detail) {
   var journalNoteData = {
    journalNoteId: journalNoteId,
    title: detail.title,
    description: detail.description
   };
   vm.editJournalNote(journalNoteData);
  }
 }

 vm.cancelJournalNote = function (form) {
  vm.noteFormDisplay = false;
  vm.newJournalNoteData = angular.copy(vm.defaultJournalNoteData)
  if (form) {
   form.$setPristine();
   form.$setUntouched();
  }
 };

 vm.revertJournalNote = function (journalNote, journalNoteCopy) {
  journalNote = journalNoteCopy;
  /*
   $filter('filter')
   (vm.journalNotesManager.journalNotes, {id: journalNoteId}, true)[0]
   = angular.copy($filter('filter')
   (vm.journalNotesCopy, {id: journalNoteId}, true)[0]);
   if (journalNote.length && journalNoteCopy.length) {
   // vm.journalNotesManager.journalNotes angular.copy(vm.journalNotesCopy);
   }
   */
 };






 vm.editedNote = null;

 $scope.$watch(angular.bind(this, function () {
  return vm.journalNotes;
 }), function () {
  //vm.remainingCount = filterFilter(journalNotes, {completed: false}).length;
  vm.doneCount = vm.journalNotesManager.journalNotes.length - vm.remainingCount;
  vm.allChecked = !vm.remainingCount;
  //JournalNoteService.put(vm.journalNotes);
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




 vm.editNote = function (journalNote) {
  vm.editedNote = journalNote;
  // Clone the original journalNote to restore it on demand.
  vm.originalNote = angular.copy(journalNote);
 };


 vm.doneEditing = function (journalNote) {
  vm.editedNote = null;
  journalNote.title = journalNote.title.trim();

  if (!journalNote.title) {
   vm.removeNote(journalNote);
  }
 };

 vm.openJournalNote = function (journalNote) {
  var modalInstance = $uibModal.open({
   animation: true,
   templateUrl: 'journal-note-modal.html',
   controller: 'JournalNoteCtrl as journalNoteCtrl',
   backdrop: 'static',
   size: 'xl',
   resolve: {
    journalNoteData: function () {
     return journalNote;
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
 vm.journalNotesManager.getJournalNotes(vm.journalId);
};


journalNotesCtrl.$inject = [
 'JournalNotesManager',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$uibModal',
 '$log',
 '$filter'];

angular.module("app.journals").controller('JournalNotesCtrl', journalNotesCtrl);
