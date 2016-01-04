var exploreNotesCtrl = function (
        ExploreNotesManager,
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
 vm.exploreId = $stateParams.exploreId;
 vm.exploreNotesCopy;
 vm.exploreNotesManager = new ExploreNotesManager();
 vm.noteFormDisplay = false;

 vm.defaultExploreNoteData = {
  exploreId: $stateParams.exploreId,
  privacy: 0
 }
 vm.newExploreNoteData = angular.copy(vm.defaultExploreNoteData);

 vm.showNoteForm = function () {
  vm.noteFormDisplay = true;
 };

 vm.createExploreNote = function (data) {
  vm.exploreNotesManager.createExploreNote(data).then(function (response) {
   vm.noteFormDisplay = false;
   vm.newExploreNoteData = angular.copy(vm.defaultExploreNoteData);
   vm.exploreNotesCopy = angular.copy(vm.exploreNotesManager.exploreNotes);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editExploreNote = function (data) {
  vm.exploreNotesManager.editExploreNote(data).then(function (response) {
   vm.noteFormDisplay = false;
   vm.newExploreNoteData = angular.copy(vm.defaultExploreNoteData);
   vm.exploreNotesCopy = angular.copy(vm.exploreNotesManager.exploreNotes);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editExploreNoteSections = {
  details: function (exploreNoteId, detail) {
   var exploreNoteData = {
    exploreNoteId: exploreNoteId,
    title: detail.title,
    description: detail.description
   };
   vm.editExploreNote(exploreNoteData);
  }
 }

 vm.cancelExploreNote = function (form) {
  vm.noteFormDisplay = false;
  vm.newExploreNoteData = angular.copy(vm.defaultExploreNoteData)
  if (form) {
   form.$setPristine();
   form.$setUntouched();
  }
 };

 vm.revertExploreNote = function (exploreNote, exploreNoteCopy) {
  exploreNote = exploreNoteCopy;
  /*
   $filter('filter')
   (vm.exploreNotesManager.exploreNotes, {id: exploreNoteId}, true)[0]
   = angular.copy($filter('filter')
   (vm.exploreNotesCopy, {id: exploreNoteId}, true)[0]);
   if (exploreNote.length && exploreNoteCopy.length) {
   // vm.exploreNotesManager.exploreNotes angular.copy(vm.exploreNotesCopy);
   }
   */
 };






 vm.editedNote = null;

 $scope.$watch(angular.bind(this, function () {
  return vm.exploreNotes;
 }), function () {
  //vm.remainingCount = filterFilter(exploreNotes, {completed: false}).length;
  vm.doneCount = vm.exploreNotesManager.exploreNotes.length - vm.remainingCount;
  vm.allChecked = !vm.remainingCount;
  //ExploreNoteService.put(vm.exploreNotes);
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




 vm.editNote = function (exploreNote) {
  vm.editedNote = exploreNote;
  // Clone the original exploreNote to restore it on demand.
  vm.originalNote = angular.copy(exploreNote);
 };


 vm.doneEditing = function (exploreNote) {
  vm.editedNote = null;
  exploreNote.title = exploreNote.title.trim();

  if (!exploreNote.title) {
   vm.removeNote(exploreNote);
  }
 };

 vm.openExploreNote = function (exploreNote) {
  var modalInstance = $uibModal.open({
   animation: true,
   templateUrl: 'explore-note-modal.html',
   controller: 'ExploreNoteCtrl as exploreNoteCtrl',
   backdrop: 'static',
   size: 'xl',
   resolve: {
    exploreNoteData: function () {
     return exploreNote;
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
 vm.exploreNotesManager.getExploreNotes(vm.exploreId);
};


exploreNotesCtrl.$inject = [
 'ExploreNotesManager',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$uibModal',
 '$log',
 '$filter'];

angular.module("app.explores").controller('ExploreNotesCtrl', exploreNotesCtrl);
