var collaborationNotesCtrl = function (
        CollaborationNotesManager,
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
 vm.collaborationId = $stateParams.collaborationId;
 vm.collaborationNotesCopy;
 vm.collaborationNotesManager = new CollaborationNotesManager();
 vm.noteFormDisplay = false;

 vm.defaultCollaborationNoteData = {
  collaborationId: $stateParams.collaborationId,
  privacy: 0
 }
 vm.newCollaborationNoteData = angular.copy(vm.defaultCollaborationNoteData);

 vm.showNoteForm = function () {
  vm.noteFormDisplay = true;
 };

 vm.createCollaborationNote = function (data) {
  vm.collaborationNotesManager.createCollaborationNote(data).then(function (response) {
   vm.noteFormDisplay = false;
   vm.newCollaborationNoteData = angular.copy(vm.defaultCollaborationNoteData);
   vm.collaborationNotesCopy = angular.copy(vm.collaborationNotesManager.collaborationNotes);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editCollaborationNote = function (data) {
  vm.collaborationNotesManager.editCollaborationNote(data).then(function (response) {
   vm.noteFormDisplay = false;
   vm.newCollaborationNoteData = angular.copy(vm.defaultCollaborationNoteData);
   vm.collaborationNotesCopy = angular.copy(vm.collaborationNotesManager.collaborationNotes);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editCollaborationNoteSections = {
  details: function (collaborationNoteId, detail) {
   var collaborationNoteData = {
    collaborationNoteId: collaborationNoteId,
    title: detail.title,
    description: detail.description
   };
   vm.editCollaborationNote(collaborationNoteData);
  }
 }

 vm.cancelCollaborationNote = function (form) {
  vm.noteFormDisplay = false;
  vm.newCollaborationNoteData = angular.copy(vm.defaultCollaborationNoteData)
  if (form) {
   form.$setPristine();
   form.$setUntouched();
  }
 };

 vm.revertCollaborationNote = function (collaborationNote, collaborationNoteCopy) {
  collaborationNote = collaborationNoteCopy;
  /*
   $filter('filter')
   (vm.collaborationNotesManager.collaborationNotes, {id: collaborationNoteId}, true)[0]
   = angular.copy($filter('filter')
   (vm.collaborationNotesCopy, {id: collaborationNoteId}, true)[0]);
   if (collaborationNote.length && collaborationNoteCopy.length) {
   // vm.collaborationNotesManager.collaborationNotes angular.copy(vm.collaborationNotesCopy);
   }
   */
 };






 vm.editedNote = null;

 $scope.$watch(angular.bind(this, function () {
  return vm.collaborationNotes;
 }), function () {
  //vm.remainingCount = filterFilter(collaborationNotes, {completed: false}).length;
  vm.doneCount = vm.collaborationNotesManager.collaborationNotes.length - vm.remainingCount;
  vm.allChecked = !vm.remainingCount;
  //CollaborationNoteService.put(vm.collaborationNotes);
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




 vm.editNote = function (collaborationNote) {
  vm.editedNote = collaborationNote;
  // Clone the original collaborationNote to restore it on demand.
  vm.originalNote = angular.copy(collaborationNote);
 };


 vm.doneEditing = function (collaborationNote) {
  vm.editedNote = null;
  collaborationNote.title = collaborationNote.title.trim();

  if (!collaborationNote.title) {
   vm.removeNote(collaborationNote);
  }
 };

 vm.openCollaborationNote = function (collaborationNote) {
  var modalInstance = $uibModal.open({
   animation: true,
   templateUrl: 'collaboration-note-modal.html',
   controller: 'CollaborationNoteCtrl as collaborationNoteCtrl',
   backdrop: 'static',
   size: 'xl',
   resolve: {
    collaborationNoteData: function () {
     return collaborationNote;
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
 vm.collaborationNotesManager.getCollaborationNotes(vm.collaborationId);
};


collaborationNotesCtrl.$inject = [
 'CollaborationNotesManager',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$uibModal',
 '$log',
 '$filter'];

angular.module("app.collaboration").controller('CollaborationNotesCtrl', collaborationNotesCtrl);
