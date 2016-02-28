var projectWeblinkCtrl = function (
        ProjectWeblinkSrv,
        $uibModalInstance,
        $scope,
        $state,
        $stateParams,
        $http,
        $rootScope,
        $location,
        $log,
        projectWeblinkData) {
 var vm = this;
 vm.projectId = projectWeblinkData.project_id;
 vm.projectWeblinkId = projectWeblinkData.id;
 vm.projectWeblinkSrv = new ProjectWeblinkSrv();


 vm.weblinkId = projectWeblinkData.weblink_id;

 vm.weblinkFormDisplay = false;




 vm.ok = function () {
  $uibModalInstance.close();
 };

 vm.close = function () {
  $uibModalInstance.dismiss('cancel');
 };

 // vm.newProjectWeblinkData = vm.defaultProjectWeblinkData;

 vm.getProjectWeblink = function (projectId, weblinkId) {
  vm.projectWeblinkSrv.getProjectWeblink(projectId, weblinkId).then(function (response) {
  }, function (error) {
   console.log(error);
  });
 };

 vm.editProjectWeblink = function (data) {
  vm.projectWeblinkSrv.editProjectWeblink(data).then(function (response) {
  }, function (response) {
   console.log(response);
  });
 };

 vm.editProjectWeblinkSections = {
  details: function (details) {
   var projectWeblinkData = {
    projectWeblinkId: vm.projectWeblinkId,
    title: details.title,
    description: details.description
   };
   vm.editProjectWeblink(projectWeblinkData);
  }
 }



 vm.showWeblinkForm = function () {
  vm.weblinkFormDisplay = true;
 };



 //--------init------
 vm.getProjectWeblink(vm.projectId, vm.weblinkId);
};


projectWeblinkCtrl.$inject = [
 'ProjectWeblinkSrv',
 '$uibModalInstance',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$log',
 'projectWeblinkData'];

angular.module("app.project").controller('ProjectWeblinkCtrl', projectWeblinkCtrl);
