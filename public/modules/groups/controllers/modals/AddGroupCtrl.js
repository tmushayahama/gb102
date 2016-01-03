var addGroupCtrl = function (
        $uibModalInstance,
        $scope,
        $state,
        $stateParams,
        $http,
        $rootScope,
        $location,
        $log,
        groupLevels) {
 var vm = this;

 vm.group = "";
 vm.groupLevels = groupLevels;

 vm.ok = function () {
  $uibModalInstance.close(vm.group);
 };

 vm.close = function () {
  $uibModalInstance.dismiss('cancel');
 };
};

addGroupCtrl.$inject = [
 '$uibModalInstance',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$log',
 'groupLevels'];

angular.module("app.groups").controller('AddGroupCtrl', addGroupCtrl);
