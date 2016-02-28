var skillProgressCtrl = function (
        SkillProgressSrv,
        $uibModalInstance,
        $scope,
        $state,
        $stateParams,
        $http,
        $rootScope,
        $location,
        $log,
        skillProgressData) {
 var vm = this;
 vm.skillId = skillProgressData.skill_id;
 vm.skillProgressId = skillProgressData.id;
 vm.skillProgressSrv = new SkillProgressSrv();


 vm.progressId = skillProgressData.progress_id;

 vm.progressFormDisplay = false;




 vm.ok = function () {
  $uibModalInstance.close();
 };

 vm.close = function () {
  $uibModalInstance.dismiss('cancel');
 };

 // vm.newSkillProgressData = vm.defaultSkillProgressData;

 vm.getSkillProgress = function (skillId, progressId) {
  vm.skillProgressSrv.getSkillProgress(skillId, progressId).then(function (response) {
  }, function (error) {
   console.log(error);
  });
 };

 vm.editSkillProgress = function (data) {
  vm.skillProgressSrv.editSkillProgress(data).then(function (response) {
  }, function (response) {
   console.log(response);
  });
 };

 vm.editSkillProgressSections = {
  details: function (details) {
   var skillProgressData = {
    skillProgressId: vm.skillProgressId,
    title: details.title,
    description: details.description
   };
   vm.editSkillProgress(skillProgressData);
  }
 }



 vm.showProgressForm = function () {
  vm.progressFormDisplay = true;
 };



 //--------init------
 vm.getSkillProgress(vm.skillId, vm.progressId);
};


skillProgressCtrl.$inject = [
 'SkillProgressSrv',
 '$uibModalInstance',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$log',
 'skillProgressData'];

angular.module("app.skills").controller('SkillProgressCtrl', skillProgressCtrl);
