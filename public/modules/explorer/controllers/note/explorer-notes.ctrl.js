var explorerNotesCtrl = function (
        ExplorerNotesSrv,
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
 vm.explorerId = $stateParams.explorerId;
 vm.explorerNotes = [];
 vm.explorerNotesCopy;
 vm.explorerNotesSrv = new ExplorerNotesSrv();
 vm.noteFormDisplay = false;

 vm.defaultExplorerNoteData = {
  explorerId: $stateParams.explorerId,
  privacy: 0
 }
 vm.newExplorerNoteData = angular.copy(vm.defaultExplorerNoteData);

 vm.showNoteForm = function () {
  vm.noteFormDisplay = true;
 };

 vm.getExplorerNotes = function (explorerId) {
  vm.explorerNotesSrv.getExplorerNotes(explorerId).then(function (response) {
   vm.explorerNotes = response;
  });
 }

 vm.createExplorerNote = function (data) {
  vm.explorerNotesSrv.createExplorerNote(data).then(function (response) {
   vm.noteFormDisplay = false;
   vm.newExplorerNoteData = angular.copy(vm.defaultExplorerNoteData);
   vm.explorerNotesCopy = angular.copy(vm.explorerNotes);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editExplorerNote = function (data) {
  vm.explorerNotesSrv.editExplorerNote(data).then(function (response) {
   vm.noteFormDisplay = false;
   vm.newExplorerNoteData = angular.copy(vm.defaultExplorerNoteData);
   vm.explorerNotesCopy = angular.copy(vm.explorerNotes);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editExplorerNoteSections = {
  details: function (explorerNoteId, detail) {
   var explorerNoteData = {
    explorerNoteId: explorerNoteId,
    title: detail.title,
    description: detail.description
   };
   vm.editExplorerNote(explorerNoteData);
  }
 }

 vm.cancelExplorerNote = function (form) {
  vm.noteFormDisplay = false;
  vm.newExplorerNoteData = angular.copy(vm.defaultExplorerNoteData)
  if (form) {
   form.$setPristine();
   form.$setUntouched();
  }
 };


 vm.editedNote = null;

 $scope.$watch(angular.bind(this, function () {
  return vm.explorerNotes;
 }), function () {
  //vm.remainingCount = filterFilter(explorerNotes, {completed: false}).length;
  vm.doneCount = vm.explorerNotes.length - vm.remainingCount;
  vm.allChecked = !vm.remainingCount;
  //ExplorerNoteService.put(vm.explorerNotes);
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




 vm.editNote = function (explorerNote) {
  vm.editedNote = explorerNote;
  // Clone the original explorerNote to restore it on demand.
  vm.originalNote = angular.copy(explorerNote);
 };


 vm.doneEditing = function (explorerNote) {
  vm.editedNote = null;
  explorerNote.title = explorerNote.title.trim();

  if (!explorerNote.title) {
   vm.removeNote(explorerNote);
  }
 };

 vm.openExplorerNote = function (explorerNote) {
  var modalInstance = $uibModal.open({
   animation: true,
   templateUrl: 'explorer-note-modal.html',
   controller: 'ExplorerNoteCtrl as explorerNoteCtrl',
   backdrop: 'static',
   size: 'xl',
   resolve: {
    explorerNoteData: function () {
     return explorerNote;
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
 vm.getExplorerNotes(vm.explorerId);
};


explorerNotesCtrl.$inject = [
 'ExplorerNotesSrv',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$uibModal',
 '$log',
 '$filter'];

angular.module("app.explorer").controller('ExplorerNotesCtrl', explorerNotesCtrl);
