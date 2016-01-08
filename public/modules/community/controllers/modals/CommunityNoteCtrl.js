var communityNoteCtrl = function (
        CommunityNoteManager,
        $uibModalInstance,
        $scope,
        $state,
        $stateParams,
        $http,
        $rootScope,
        $location,
        $log,
        communityNoteData) {
 var vm = this;
 vm.communityId = communityNoteData.community_id;
 vm.communityNoteId = communityNoteData.id;
 vm.communityNoteManager = new CommunityNoteManager();


 vm.noteId = communityNoteData.note_id;

 vm.noteFormDisplay = false;




 vm.ok = function () {
  $uibModalInstance.close();
 };

 vm.close = function () {
  $uibModalInstance.dismiss('cancel');
 };

 // vm.newCommunityNoteData = vm.defaultCommunityNoteData;

 vm.getCommunityNote = function (communityId, noteId) {
  vm.communityNoteManager.getCommunityNote(communityId, noteId).then(function (response) {
  }, function (error) {
   console.log(error);
  });
 };

 vm.editCommunityNote = function (data) {
  vm.communityNoteManager.editCommunityNote(data).then(function (response) {
  }, function (response) {
   console.log(response);
  });
 };

 vm.editCommunityNoteSections = {
  details: function (details) {
   var communityNoteData = {
    communityNoteId: vm.communityNoteId,
    title: details.title,
    description: details.description
   };
   vm.editCommunityNote(communityNoteData);
  }
 };



 vm.showNoteForm = function () {
  vm.noteFormDisplay = true;
 };



 //--------init------
 vm.getCommunityNote(vm.communityId, vm.noteId);
};


communityNoteCtrl.$inject = [
 'CommunityNoteManager',
 '$uibModalInstance',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$log',
 'communityNoteData'];

angular.module("app.communitys").controller('CommunityNoteCtrl', communityNoteCtrl);
