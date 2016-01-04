var swipeNotesCtrl = function (
        SwipeNotesManager,
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
 vm.swipeId = $stateParams.swipeId;
 vm.swipeNotesCopy;
 vm.swipeNotesManager = new SwipeNotesManager();
 vm.noteFormDisplay = false;

 vm.defaultSwipeNoteData = {
  swipeId: $stateParams.swipeId,
  privacy: 0
 }
 vm.newSwipeNoteData = angular.copy(vm.defaultSwipeNoteData);

 vm.showNoteForm = function () {
  vm.noteFormDisplay = true;
 };

 vm.createSwipeNote = function (data) {
  vm.swipeNotesManager.createSwipeNote(data).then(function (response) {
   vm.noteFormDisplay = false;
   vm.newSwipeNoteData = angular.copy(vm.defaultSwipeNoteData);
   vm.swipeNotesCopy = angular.copy(vm.swipeNotesManager.swipeNotes);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editSwipeNote = function (data) {
  vm.swipeNotesManager.editSwipeNote(data).then(function (response) {
   vm.noteFormDisplay = false;
   vm.newSwipeNoteData = angular.copy(vm.defaultSwipeNoteData);
   vm.swipeNotesCopy = angular.copy(vm.swipeNotesManager.swipeNotes);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editSwipeNoteSections = {
  details: function (swipeNoteId, detail) {
   var swipeNoteData = {
    swipeNoteId: swipeNoteId,
    title: detail.title,
    description: detail.description
   };
   vm.editSwipeNote(swipeNoteData);
  }
 }

 vm.cancelSwipeNote = function (form) {
  vm.noteFormDisplay = false;
  vm.newSwipeNoteData = angular.copy(vm.defaultSwipeNoteData)
  if (form) {
   form.$setPristine();
   form.$setUntouched();
  }
 };

 vm.revertSwipeNote = function (swipeNote, swipeNoteCopy) {
  swipeNote = swipeNoteCopy;
  /*
   $filter('filter')
   (vm.swipeNotesManager.swipeNotes, {id: swipeNoteId}, true)[0]
   = angular.copy($filter('filter')
   (vm.swipeNotesCopy, {id: swipeNoteId}, true)[0]);
   if (swipeNote.length && swipeNoteCopy.length) {
   // vm.swipeNotesManager.swipeNotes angular.copy(vm.swipeNotesCopy);
   }
   */
 };






 vm.editedNote = null;

 $scope.$watch(angular.bind(this, function () {
  return vm.swipeNotes;
 }), function () {
  //vm.remainingCount = filterFilter(swipeNotes, {completed: false}).length;
  vm.doneCount = vm.swipeNotesManager.swipeNotes.length - vm.remainingCount;
  vm.allChecked = !vm.remainingCount;
  //SwipeNoteService.put(vm.swipeNotes);
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




 vm.editNote = function (swipeNote) {
  vm.editedNote = swipeNote;
  // Clone the original swipeNote to restore it on demand.
  vm.originalNote = angular.copy(swipeNote);
 };


 vm.doneEditing = function (swipeNote) {
  vm.editedNote = null;
  swipeNote.title = swipeNote.title.trim();

  if (!swipeNote.title) {
   vm.removeNote(swipeNote);
  }
 };

 vm.openSwipeNote = function (swipeNote) {
  var modalInstance = $uibModal.open({
   animation: true,
   templateUrl: 'swipe-note-modal.html',
   controller: 'SwipeNoteCtrl as swipeNoteCtrl',
   backdrop: 'static',
   size: 'xl',
   resolve: {
    swipeNoteData: function () {
     return swipeNote;
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
 vm.swipeNotesManager.getSwipeNotes(vm.swipeId);
};


swipeNotesCtrl.$inject = [
 'SwipeNotesManager',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$uibModal',
 '$log',
 '$filter'];

angular.module("app.swipes").controller('SwipeNotesCtrl', swipeNotesCtrl);
