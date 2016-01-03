var addProjectCtrl = function (
        $uibModalInstance,
        $scope,
        $state,
        $stateParams,
        $http,
        $rootScope,
        $location,
        $log,
        projectLevels) {
 var vm = this;

 vm.project = "";
 vm.projectLevels = projectLevels;

 vm.ok = function () {
  $uibModalInstance.close(vm.project);
 };

 vm.close = function () {
  $uibModalInstance.dismiss('cancel');
 };
};

addProjectCtrl.$inject = [
 '$uibModalInstance',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$log',
 'projectLevels'];

angular.module("app.projects").controller('AddProjectCtrl', addProjectCtrl);
