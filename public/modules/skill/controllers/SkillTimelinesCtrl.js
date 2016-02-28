var skillProgressCtrl = function (
        SkillProgressSrv,
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
 vm.skillId = $stateParams.skillId;
 vm.skillProgressCopy;
 vm.skillProgressSrv = new SkillProgressSrv();
 vm.progressFormDisplay = false;

 vm.defaultSkillProgressData = {
  skillId: $stateParams.skillId,
  privacy: 0
 }
 vm.newSkillProgressData = angular.copy(vm.defaultSkillProgressData);

 vm.showProgressForm = function () {
  vm.progressFormDisplay = true;
 };

 vm.createSkillProgress = function (data) {
  vm.skillProgressSrv.createSkillProgress(data).then(function (response) {
   vm.progressFormDisplay = false;
   vm.newSkillProgressData = angular.copy(vm.defaultSkillProgressData);
   vm.skillProgressCopy = angular.copy(vm.skillProgressSrv.skillProgress);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editSkillProgress = function (data) {
  vm.skillProgressSrv.editSkillProgress(data).then(function (response) {
   vm.progressFormDisplay = false;
   vm.newSkillProgressData = angular.copy(vm.defaultSkillProgressData);
   vm.skillProgressCopy = angular.copy(vm.skillProgressSrv.skillProgress);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editSkillProgressSections = {
  details: function (skillProgressId, detail) {
   var skillProgressData = {
    skillProgressId: skillProgressId,
    title: detail.title,
    description: detail.description
   };
   vm.editSkillProgress(skillProgressData);
  }
 }

 vm.cancelSkillProgress = function (form) {
  vm.progressFormDisplay = false;
  vm.newSkillProgressData = angular.copy(vm.defaultSkillProgressData)
  if (form) {
   form.$setPristine();
   form.$setUntouched();
  }
 };

 vm.revertSkillProgress = function (skillProgress, skillProgressCopy) {
  skillProgress = skillProgressCopy;
  /*
   $filter('filter')
   (vm.skillProgressSrv.skillProgress, {id: skillProgressId}, true)[0]
   = angular.copy($filter('filter')
   (vm.skillProgressCopy, {id: skillProgressId}, true)[0]);
   if (skillProgress.length && skillProgressCopy.length) {
   // vm.skillProgressSrv.skillProgress angular.copy(vm.skillProgressCopy);
   }
   */
 };






 vm.editedProgress = null;

 $scope.$watch(angular.bind(this, function () {
  return vm.skillProgress;
 }), function () {
  //vm.remainingCount = filterFilter(skillProgress, {completed: false}).length;
  vm.doneCount = vm.skillProgressSrv.skillProgress.length - vm.remainingCount;
  vm.allChecked = !vm.remainingCount;
  //SkillProgressService.put(vm.skillProgress);
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




 vm.editProgress = function (skillProgress) {
  vm.editedProgress = skillProgress;
  // Clone the original skillProgress to restore it on demand.
  vm.originalProgress = angular.copy(skillProgress);
 };


 vm.doneEditing = function (skillProgress) {
  vm.editedProgress = null;
  skillProgress.title = skillProgress.title.trim();

  if (!skillProgress.title) {
   vm.removeProgress(skillProgress);
  }
 };

 vm.openSkillProgress = function (skillProgress) {
  var modalInstance = $uibModal.open({
   animation: true,
   templateUrl: 'skill-progress-modal.html',
   controller: 'SkillProgressCtrl as skillProgressCtrl',
   backdrop: 'static',
   size: 'xl',
   resolve: {
    skillProgressData: function () {
     return skillProgress;
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
 vm.skillProgressSrv.getSkillProgress(vm.skillId);
};

skillProgressCtrl.$inject = [
 'SkillProgressSrv',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$uibModal',
 '$log',
 '$filter'];

angular.module("app.skills").controller('SkillProgressCtrl', skillProgressCtrl);
