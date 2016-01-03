var addTeachCtrl = function (
        $uibModalInstance,
        $scope,
        $state,
        $stateParams,
        $http,
        $rootScope,
        $location,
        $log,
        teachLevels) {
 var vm = this;

 vm.teach = "";
 vm.teachLevels = teachLevels;

 vm.ok = function () {
  $uibModalInstance.close(vm.teach);
 };

 vm.close = function () {
  $uibModalInstance.dismiss('cancel');
 };
};

addTeachCtrl.$inject = [
 '$uibModalInstance',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$log',
 'teachLevels'];

angular.module("app.teachs").controller('AddTeachCtrl', addTeachCtrl);
