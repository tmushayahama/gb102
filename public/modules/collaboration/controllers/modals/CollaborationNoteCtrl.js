var collaborationNoteCtrl = function (
        CollaborationNoteSrv,
        $uibModalInstance,
        $scope,
        $state,
        $stateParams,
        $http,
        $rootScope,
        $location,
        $log,
        collaborationNoteData) {
 var vm = this;
 vm.collaborationId = collaborationNoteData.collaboration_id;
 vm.collaborationNoteId = collaborationNoteData.id;
 vm.collaborationNoteSrv = new CollaborationNoteSrv();


 vm.noteId = collaborationNoteData.note_id;

 vm.noteFormDisplay = false;




 vm.ok = function () {
  $uibModalInstance.close();
 };

 vm.close = function () {
  $uibModalInstance.dismiss('cancel');
 };

 // vm.newCollaborationNoteData = vm.defaultCollaborationNoteData;

 vm.getCollaborationNote = function (collaborationId, noteId) {
  vm.collaborationNoteSrv.getCollaborationNote(collaborationId, noteId).then(function (response) {
  }, function (error) {
   console.log(error);
  });
 };

 vm.editCollaborationNote = function (data) {
  vm.collaborationNoteSrv.editCollaborationNote(data).then(function (response) {
  }, function (response) {
   console.log(response);
  });
 };

 vm.editCollaborationNoteSections = {
  details: function (details) {
   var collaborationNoteData = {
    collaborationNoteId: vm.collaborationNoteId,
    title: details.title,
    description: details.description
   };
   vm.editCollaborationNote(collaborationNoteData);
  }
 };



 vm.showNoteForm = function () {
  vm.noteFormDisplay = true;
 };



 //--------init------
 vm.getCollaborationNote(vm.collaborationId, vm.noteId);
};


collaborationNoteCtrl.$inject = [
 'CollaborationNoteSrv',
 '$uibModalInstance',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$log',
 'collaborationNoteData'];

angular.module("app.collaboration").controller('CollaborationNoteCtrl', collaborationNoteCtrl);
