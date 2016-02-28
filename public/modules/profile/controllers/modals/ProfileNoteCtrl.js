var profileNoteCtrl = function (
        ProfileNoteSrv,
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
 vm.profileNoteSrv = new ProfileNoteSrv();


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
  vm.profileNoteSrv.getProfileNote(profileId, noteId).then(function (response) {
  }, function (error) {
   console.log(error);
  });
 };

 vm.editProfileNote = function (data) {
  vm.profileNoteSrv.editProfileNote(data).then(function (response) {
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
 'ProfileNoteSrv',
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
