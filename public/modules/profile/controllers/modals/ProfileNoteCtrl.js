var profileNoteCtrl = function (
        ProfileNoteManager,
        $uibModalInstance,
        $scope,
        $state,
        $stateParams,
        $http,
        $rootScope,
        $location,
        $log,
        profileNoteData) {
 var vm = this;
 vm.profileId = profileNoteData.profile_id;
 vm.profileNoteId = profileNoteData.id;
 vm.profileNoteManager = new ProfileNoteManager();


 vm.noteId = profileNoteData.note_id;

 vm.noteFormDisplay = false;




 vm.ok = function () {
  $uibModalInstance.close();
 };

 vm.close = function () {
  $uibModalInstance.dismiss('cancel');
 };

 // vm.newProfileNoteData = vm.defaultProfileNoteData;

 vm.getProfileNote = function (profileId, noteId) {
  vm.profileNoteManager.getProfileNote(profileId, noteId).then(function (response) {
  }, function (error) {
   console.log(error);
  });
 };

 vm.editProfileNote = function (data) {
  vm.profileNoteManager.editProfileNote(data).then(function (response) {
  }, function (response) {
   console.log(response);
  });
 };

 vm.editProfileNoteSections = {
  details: function (details) {
   var profileNoteData = {
    profileNoteId: vm.profileNoteId,
    title: details.title,
    description: details.description
   };
   vm.editProfileNote(profileNoteData);
  }
 };



 vm.showNoteForm = function () {
  vm.noteFormDisplay = true;
 };



 //--------init------
 vm.getProfileNote(vm.profileId, vm.noteId);
};


profileNoteCtrl.$inject = [
 'ProfileNoteManager',
 '$uibModalInstance',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$log',
 'profileNoteData'];

angular.module("app.profile").controller('ProfileNoteCtrl', profileNoteCtrl);
