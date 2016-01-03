var profileNotesCtrl = function (
        ProfileNotesManager,
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
 vm.profileId = $stateParams.profileId;
 vm.profileNotesCopy;
 vm.profileNotesManager = new ProfileNotesManager();
 vm.noteFormDisplay = false;

 vm.defaultProfileNoteData = {
  profileId: $stateParams.profileId,
  privacy: 0
 }
 vm.newProfileNoteData = angular.copy(vm.defaultProfileNoteData);

 vm.showNoteForm = function () {
  vm.noteFormDisplay = true;
 };

 vm.createProfileNote = function (data) {
  vm.profileNotesManager.createProfileNote(data).then(function (response) {
   vm.noteFormDisplay = false;
   vm.newProfileNoteData = angular.copy(vm.defaultProfileNoteData);
   vm.profileNotesCopy = angular.copy(vm.profileNotesManager.profileNotes);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editProfileNote = function (data) {
  vm.profileNotesManager.editProfileNote(data).then(function (response) {
   vm.noteFormDisplay = false;
   vm.newProfileNoteData = angular.copy(vm.defaultProfileNoteData);
   vm.profileNotesCopy = angular.copy(vm.profileNotesManager.profileNotes);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editProfileNoteSections = {
  details: function (profileNoteId, detail) {
   var profileNoteData = {
    profileNoteId: profileNoteId,
    title: detail.title,
    description: detail.description
   };
   vm.editProfileNote(profileNoteData);
  }
 }

 vm.cancelProfileNote = function (form) {
  vm.noteFormDisplay = false;
  vm.newProfileNoteData = angular.copy(vm.defaultProfileNoteData)
  if (form) {
   form.$setPristine();
   form.$setUntouched();
  }
 };

 vm.revertProfileNote = function (profileNote, profileNoteCopy) {
  profileNote = profileNoteCopy;
  /*
   $filter('filter')
   (vm.profileNotesManager.profileNotes, {id: profileNoteId}, true)[0]
   = angular.copy($filter('filter')
   (vm.profileNotesCopy, {id: profileNoteId}, true)[0]);
   if (profileNote.length && profileNoteCopy.length) {
   // vm.profileNotesManager.profileNotes angular.copy(vm.profileNotesCopy);
   }
   */
 };






 vm.editedNote = null;

 $scope.$watch(angular.bind(this, function () {
  return vm.profileNotes;
 }), function () {
  //vm.remainingCount = filterFilter(profileNotes, {completed: false}).length;
  vm.doneCount = vm.profileNotesManager.profileNotes.length - vm.remainingCount;
  vm.allChecked = !vm.remainingCount;
  //ProfileNoteService.put(vm.profileNotes);
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




 vm.editNote = function (profileNote) {
  vm.editedNote = profileNote;
  // Clone the original profileNote to restore it on demand.
  vm.originalNote = angular.copy(profileNote);
 };


 vm.doneEditing = function (profileNote) {
  vm.editedNote = null;
  profileNote.title = profileNote.title.trim();

  if (!profileNote.title) {
   vm.removeNote(profileNote);
  }
 };

 vm.openProfileNote = function (profileNote) {
  var modalInstance = $uibModal.open({
   animation: true,
   templateUrl: 'profile-note-modal.html',
   controller: 'ProfileNoteCtrl as profileNoteCtrl',
   backdrop: 'static',
   size: 'xl',
   resolve: {
    profileNoteData: function () {
     return profileNote;
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
 vm.profileNotesManager.getProfileNotes(vm.profileId);
};


profileNotesCtrl.$inject = [
 'ProfileNotesManager',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$uibModal',
 '$log',
 '$filter'];

angular.module("app.profiles").controller('ProfileNotesCtrl', profileNotesCtrl);
