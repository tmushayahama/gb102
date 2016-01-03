var groupNotesCtrl = function (
        GroupNotesManager,
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
 vm.groupId = $stateParams.groupId;
 vm.groupNotesCopy;
 vm.groupNotesManager = new GroupNotesManager();
 vm.noteFormDisplay = false;

 vm.defaultGroupNoteData = {
  groupId: $stateParams.groupId,
  privacy: 0
 }
 vm.newGroupNoteData = angular.copy(vm.defaultGroupNoteData);

 vm.showNoteForm = function () {
  vm.noteFormDisplay = true;
 };

 vm.createGroupNote = function (data) {
  vm.groupNotesManager.createGroupNote(data).then(function (response) {
   vm.noteFormDisplay = false;
   vm.newGroupNoteData = angular.copy(vm.defaultGroupNoteData);
   vm.groupNotesCopy = angular.copy(vm.groupNotesManager.groupNotes);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editGroupNote = function (data) {
  vm.groupNotesManager.editGroupNote(data).then(function (response) {
   vm.noteFormDisplay = false;
   vm.newGroupNoteData = angular.copy(vm.defaultGroupNoteData);
   vm.groupNotesCopy = angular.copy(vm.groupNotesManager.groupNotes);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editGroupNoteSections = {
  details: function (groupNoteId, detail) {
   var groupNoteData = {
    groupNoteId: groupNoteId,
    title: detail.title,
    description: detail.description
   };
   vm.editGroupNote(groupNoteData);
  }
 }

 vm.cancelGroupNote = function (form) {
  vm.noteFormDisplay = false;
  vm.newGroupNoteData = angular.copy(vm.defaultGroupNoteData)
  if (form) {
   form.$setPristine();
   form.$setUntouched();
  }
 };

 vm.revertGroupNote = function (groupNote, groupNoteCopy) {
  groupNote = groupNoteCopy;
  /*
   $filter('filter')
   (vm.groupNotesManager.groupNotes, {id: groupNoteId}, true)[0]
   = angular.copy($filter('filter')
   (vm.groupNotesCopy, {id: groupNoteId}, true)[0]);
   if (groupNote.length && groupNoteCopy.length) {
   // vm.groupNotesManager.groupNotes angular.copy(vm.groupNotesCopy);
   }
   */
 };






 vm.editedNote = null;

 $scope.$watch(angular.bind(this, function () {
  return vm.groupNotes;
 }), function () {
  //vm.remainingCount = filterFilter(groupNotes, {completed: false}).length;
  vm.doneCount = vm.groupNotesManager.groupNotes.length - vm.remainingCount;
  vm.allChecked = !vm.remainingCount;
  //GroupNoteService.put(vm.groupNotes);
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




 vm.editNote = function (groupNote) {
  vm.editedNote = groupNote;
  // Clone the original groupNote to restore it on demand.
  vm.originalNote = angular.copy(groupNote);
 };


 vm.doneEditing = function (groupNote) {
  vm.editedNote = null;
  groupNote.title = groupNote.title.trim();

  if (!groupNote.title) {
   vm.removeNote(groupNote);
  }
 };

 vm.openGroupNote = function (groupNote) {
  var modalInstance = $uibModal.open({
   animation: true,
   templateUrl: 'group-note-modal.html',
   controller: 'GroupNoteCtrl as groupNoteCtrl',
   backdrop: 'static',
   size: 'xl',
   resolve: {
    groupNoteData: function () {
     return groupNote;
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
 vm.groupNotesManager.getGroupNotes(vm.groupId);
};


groupNotesCtrl.$inject = [
 'GroupNotesManager',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$uibModal',
 '$log',
 '$filter'];

angular.module("app.groups").controller('GroupNotesCtrl', groupNotesCtrl);
