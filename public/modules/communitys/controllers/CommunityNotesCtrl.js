var communityNotesCtrl = function (
        CommunityNotesManager,
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
 vm.communityId = $stateParams.communityId;
 vm.communityNotesCopy;
 vm.communityNotesManager = new CommunityNotesManager();
 vm.noteFormDisplay = false;

 vm.defaultCommunityNoteData = {
  communityId: $stateParams.communityId,
  privacy: 0
 }
 vm.newCommunityNoteData = angular.copy(vm.defaultCommunityNoteData);

 vm.showNoteForm = function () {
  vm.noteFormDisplay = true;
 };

 vm.createCommunityNote = function (data) {
  vm.communityNotesManager.createCommunityNote(data).then(function (response) {
   vm.noteFormDisplay = false;
   vm.newCommunityNoteData = angular.copy(vm.defaultCommunityNoteData);
   vm.communityNotesCopy = angular.copy(vm.communityNotesManager.communityNotes);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editCommunityNote = function (data) {
  vm.communityNotesManager.editCommunityNote(data).then(function (response) {
   vm.noteFormDisplay = false;
   vm.newCommunityNoteData = angular.copy(vm.defaultCommunityNoteData);
   vm.communityNotesCopy = angular.copy(vm.communityNotesManager.communityNotes);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editCommunityNoteSections = {
  details: function (communityNoteId, detail) {
   var communityNoteData = {
    communityNoteId: communityNoteId,
    title: detail.title,
    description: detail.description
   };
   vm.editCommunityNote(communityNoteData);
  }
 }

 vm.cancelCommunityNote = function (form) {
  vm.noteFormDisplay = false;
  vm.newCommunityNoteData = angular.copy(vm.defaultCommunityNoteData)
  if (form) {
   form.$setPristine();
   form.$setUntouched();
  }
 };

 vm.revertCommunityNote = function (communityNote, communityNoteCopy) {
  communityNote = communityNoteCopy;
  /*
   $filter('filter')
   (vm.communityNotesManager.communityNotes, {id: communityNoteId}, true)[0]
   = angular.copy($filter('filter')
   (vm.communityNotesCopy, {id: communityNoteId}, true)[0]);
   if (communityNote.length && communityNoteCopy.length) {
   // vm.communityNotesManager.communityNotes angular.copy(vm.communityNotesCopy);
   }
   */
 };






 vm.editedNote = null;

 $scope.$watch(angular.bind(this, function () {
  return vm.communityNotes;
 }), function () {
  //vm.remainingCount = filterFilter(communityNotes, {completed: false}).length;
  vm.doneCount = vm.communityNotesManager.communityNotes.length - vm.remainingCount;
  vm.allChecked = !vm.remainingCount;
  //CommunityNoteService.put(vm.communityNotes);
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




 vm.editNote = function (communityNote) {
  vm.editedNote = communityNote;
  // Clone the original communityNote to restore it on demand.
  vm.originalNote = angular.copy(communityNote);
 };


 vm.doneEditing = function (communityNote) {
  vm.editedNote = null;
  communityNote.title = communityNote.title.trim();

  if (!communityNote.title) {
   vm.removeNote(communityNote);
  }
 };

 vm.openCommunityNote = function (communityNote) {
  var modalInstance = $uibModal.open({
   animation: true,
   templateUrl: 'community-note-modal.html',
   controller: 'CommunityNoteCtrl as communityNoteCtrl',
   backdrop: 'static',
   size: 'xl',
   resolve: {
    communityNoteData: function () {
     return communityNote;
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
 vm.communityNotesManager.getCommunityNotes(vm.communityId);
};


communityNotesCtrl.$inject = [
 'CommunityNotesManager',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$uibModal',
 '$log',
 '$filter'];

angular.module("app.communitys").controller('CommunityNotesCtrl', communityNotesCtrl);
