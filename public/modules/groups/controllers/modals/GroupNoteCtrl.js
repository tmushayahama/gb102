var groupNoteCtrl = function (
        GroupNoteManager,
        $uibModalInstance,
        $scope,
        $state,
        $stateParams,
        $http,
        $rootScope,
        $location,
        $log,
        groupNoteData) {
 var vm = this;
 vm.groupId = groupNoteData.group_id;
 vm.groupNoteId = groupNoteData.id;
 vm.groupNoteManager = new GroupNoteManager();


 vm.noteId = groupNoteData.note_id;

 vm.noteFormDisplay = false;




 vm.ok = function () {
  $uibModalInstance.close();
 };

 vm.close = function () {
  $uibModalInstance.dismiss('cancel');
 };

 // vm.newGroupNoteData = vm.defaultGroupNoteData;

 vm.getGroupNote = function (groupId, noteId) {
  vm.groupNoteManager.getGroupNote(groupId, noteId).then(function (response) {
  }, function (error) {
   console.log(error);
  });
 };

 vm.editGroupNote = function (data) {
  vm.groupNoteManager.editGroupNote(data).then(function (response) {
  }, function (response) {
   console.log(response);
  });
 };

 vm.editGroupNoteSections = {
  details: function (details) {
   var groupNoteData = {
    groupNoteId: vm.groupNoteId,
    title: details.title,
    description: details.description
   };
   vm.editGroupNote(groupNoteData);
  }
 };



 vm.showNoteForm = function () {
  vm.noteFormDisplay = true;
 };



 //--------init------
 vm.getGroupNote(vm.groupId, vm.noteId);
};


groupNoteCtrl.$inject = [
 'GroupNoteManager',
 '$uibModalInstance',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$log',
 'groupNoteData'];

angular.module("app.groups").controller('GroupNoteCtrl', groupNoteCtrl);
