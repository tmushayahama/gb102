var projectNoteCtrl = function (
        ProjectNotesSrv,
        $uibModalInstance,
        $scope,
        $state,
        $stateParams,
        $http,
        $rootScope,
        $location,
        $log,
        projectNoteData) {
 var vm = this;
 vm.projectId = projectNoteData.project_id;
 vm.projectNoteId = projectNoteData.id;
 vm.projectNotesSrv = new ProjectNotesSrv();


 vm.noteId = projectNoteData.note_id;

 vm.noteFormDisplay = false;




 vm.ok = function () {
  $uibModalInstance.close();
 };

 vm.close = function () {
  $uibModalInstance.dismiss('cancel');
 };

 // vm.newProjectNoteData = vm.defaultProjectNoteData;

 vm.getProjectNote = function (projectId, noteId) {
  vm.projectNotesSrv.getProjectNote(projectId, noteId).then(function (response) {
  }, function (error) {
   console.log(error);
  });
 };

 vm.editProjectNote = function (data) {
  vm.projectNotesSrv.editProjectNote(data).then(function (response) {
  }, function (response) {
   console.log(response);
  });
 };

 vm.editProjectNoteSections = {
  details: function (details) {
   var projectNoteData = {
    projectNoteId: vm.projectNoteId,
    title: details.title,
    description: details.description
   };
   vm.editProjectNote(projectNoteData);
  }
 };



 vm.showNoteForm = function () {
  vm.noteFormDisplay = true;
 };



 //--------init------
 vm.getProjectNote(vm.projectId, vm.noteId);
};


projectNoteCtrl.$inject = [
 'ProjectNotesSrv',
 '$uibModalInstance',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$log',
 'projectNoteData'];

angular.module("app.project").controller('ProjectNoteCtrl', projectNoteCtrl);
