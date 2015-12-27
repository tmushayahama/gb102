var addGoalCtrl = function (
        $uibModalInstance,
        $scope,
        $state,
        $stateParams,
        $http,
        $rootScope,
        $location,
        $log,
        goalLevels) {
 var vm = this;

 vm.goal = "";
 vm.goalLevels = goalLevels;

 vm.ok = function () {
  $uibModalInstance.close(vm.goal);
 };

 vm.close = function () {
  $uibModalInstance.dismiss('cancel');
 };
};

addGoalCtrl.$inject = [
 '$uibModalInstance',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$log',
 'goalLevels'];

angular.module("app.goals").controller('AddGoalCtrl', addGoalCtrl);
