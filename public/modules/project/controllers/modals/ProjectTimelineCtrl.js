var projectProgressCtrl = function (
        ProjectProgressManager,
        $uibModalInstance,
        $scope,
        $state,
        $stateParams,
        $http,
        $rootScope,
        $location,
        $log,
        projectProgressData) {
 var vm = this;
 vm.projectId = projectProgressData.project_id;
 vm.projectProgressId = projectProgressData.id;
 vm.projectProgressManager = new ProjectProgressManager();


 vm.progressId = projectProgressData.progress_id;

 vm.progressFormDisplay = false;




 vm.ok = function () {
  $uibModalInstance.close();
 };

 vm.close = function () {
  $uibModalInstance.dismiss('cancel');
 };

 // vm.newProjectProgressData = vm.defaultProjectProgressData;

 vm.getProjectProgress = function (projectId, progressId) {
  vm.projectProgressManager.getProjectProgress(projectId, progressId).then(function (response) {
  }, function (error) {
   console.log(error);
  });
 };

 vm.editProjectProgress = function (data) {
  vm.projectProgressManager.editProjectProgress(data).then(function (response) {
  }, function (response) {
   console.log(response);
  });
 };

 vm.editProjectProgressSections = {
  details: function (details) {
   var projectProgressData = {
    projectProgressId: vm.projectProgressId,
    title: details.title,
    description: details.description
   };
   vm.editProjectProgress(projectProgressData);
  }
 }



 vm.showProgressForm = function () {
  vm.progressFormDisplay = true;
 };



 //--------init------
 vm.getProjectProgress(vm.projectId, vm.progressId);
};


projectProgressCtrl.$inject = [
 'ProjectProgressManager',
 '$uibModalInstance',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$log',
 'projectProgressData'];

angular.module("app.project").controller('ProjectProgressCtrl', projectProgressCtrl);
