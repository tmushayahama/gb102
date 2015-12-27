var skillNoteCtrl = function (
        SkillNoteManager,
        $uibModalInstance,
        $scope,
        $state,
        $stateParams,
        $http,
        $rootScope,
        $location,
        $log,
        skillNoteData) {
 var vm = this;
 vm.skillId = skillNoteData.skill_id;
 vm.skillNoteId = skillNoteData.id;
 vm.skillNoteManager = new SkillNoteManager();


 vm.noteId = skillNoteData.note_id;

 vm.noteFormDisplay = false;




 vm.ok = function () {
  $uibModalInstance.close();
 };

 vm.close = function () {
  $uibModalInstance.dismiss('cancel');
 };

 // vm.newSkillNoteData = vm.defaultSkillNoteData;

 vm.getSkillNote = function (skillId, noteId) {
  vm.skillNoteManager.getSkillNote(skillId, noteId).then(function (response) {
  }, function (error) {
   console.log(error);
  });
 };

 vm.editSkillNote = function (data) {
  vm.skillNoteManager.editSkillNote(data).then(function (response) {
  }, function (response) {
   console.log(response);
  });
 };

 vm.editSkillNoteSections = {
  details: function (details) {
   var skillNoteData = {
    skillNoteId: vm.skillNoteId,
    title: details.title,
    description: details.description
   };
   vm.editSkillNote(skillNoteData);
  }
 };



 vm.showNoteForm = function () {
  vm.noteFormDisplay = true;
 };



 //--------init------
 vm.getSkillNote(vm.skillId, vm.noteId);
};


skillNoteCtrl.$inject = [
 'SkillNoteManager',
 '$uibModalInstance',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$log',
 'skillNoteData'];

angular.module("app.skills").controller('SkillNoteCtrl', skillNoteCtrl);
