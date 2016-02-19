var projectProgressCtrl = function (
        ProjectProgressManager,
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
 vm.projectId = $stateParams.projectId;
 vm.projectProgressCopy;
 vm.projectProgressManager = new ProjectProgressManager();
 vm.progressFormDisplay = false;

 vm.defaultProjectProgressData = {
  projectId: $stateParams.projectId,
  privacy: 0
 }
 vm.newProjectProgressData = angular.copy(vm.defaultProjectProgressData);

 vm.showProgressForm = function () {
  vm.progressFormDisplay = true;
 };

 vm.createProjectProgress = function (data) {
  vm.projectProgressManager.createProjectProgress(data).then(function (response) {
   vm.progressFormDisplay = false;
   vm.newProjectProgressData = angular.copy(vm.defaultProjectProgressData);
   vm.projectProgressCopy = angular.copy(vm.projectProgressManager.projectProgress);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editProjectProgress = function (data) {
  vm.projectProgressManager.editProjectProgress(data).then(function (response) {
   vm.progressFormDisplay = false;
   vm.newProjectProgressData = angular.copy(vm.defaultProjectProgressData);
   vm.projectProgressCopy = angular.copy(vm.projectProgressManager.projectProgress);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editProjectProgressSections = {
  details: function (projectProgressId, detail) {
   var projectProgressData = {
    projectProgressId: projectProgressId,
    title: detail.title,
    description: detail.description
   };
   vm.editProjectProgress(projectProgressData);
  }
 }

 vm.cancelProjectProgress = function (form) {
  vm.progressFormDisplay = false;
  vm.newProjectProgressData = angular.copy(vm.defaultProjectProgressData)
  if (form) {
   form.$setPristine();
   form.$setUntouched();
  }
 };

 vm.revertProjectProgress = function (projectProgress, projectProgressCopy) {
  projectProgress = projectProgressCopy;
  /*
   $filter('filter')
   (vm.projectProgressManager.projectProgress, {id: projectProgressId}, true)[0]
   = angular.copy($filter('filter')
   (vm.projectProgressCopy, {id: projectProgressId}, true)[0]);
   if (projectProgress.length && projectProgressCopy.length) {
   // vm.projectProgressManager.projectProgress angular.copy(vm.projectProgressCopy);
   }
   */
 };






 vm.editedProgress = null;

 $scope.$watch(angular.bind(this, function () {
  return vm.projectProgress;
 }), function () {
  //vm.remainingCount = filterFilter(projectProgress, {completed: false}).length;
  vm.doneCount = vm.projectProgressManager.projectProgress.length - vm.remainingCount;
  vm.allChecked = !vm.remainingCount;
  //ProjectProgressService.put(vm.projectProgress);
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




 vm.editProgress = function (projectProgress) {
  vm.editedProgress = projectProgress;
  // Clone the original projectProgress to restore it on demand.
  vm.originalProgress = angular.copy(projectProgress);
 };


 vm.doneEditing = function (projectProgress) {
  vm.editedProgress = null;
  projectProgress.title = projectProgress.title.trim();

  if (!projectProgress.title) {
   vm.removeProgress(projectProgress);
  }
 };

 vm.openProjectProgress = function (projectProgress) {
  var modalInstance = $uibModal.open({
   animation: true,
   templateUrl: 'project-progress-modal.html',
   controller: 'ProjectProgressCtrl as projectProgressCtrl',
   backdrop: 'static',
   size: 'xl',
   resolve: {
    projectProgressData: function () {
     return projectProgress;
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
 vm.projectProgressManager.getProjectProgress(vm.projectId);
};

projectProgressCtrl.$inject = [
 'ProjectProgressManager',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$uibModal',
 '$log',
 '$filter'];

angular.module("app.project").controller('ProjectProgressCtrl', projectProgressCtrl);
