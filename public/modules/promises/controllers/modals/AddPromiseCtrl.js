var addPromiseCtrl = function (
        $uibModalInstance,
        $scope,
        $state,
        $stateParams,
        $http,
        $rootScope,
        $location,
        $log,
        promiseLevels) {
 var vm = this;

 vm.promise = "";
 vm.promiseLevels = promiseLevels;

 vm.ok = function () {
  $uibModalInstance.close(vm.promise);
 };

 vm.close = function () {
  $uibModalInstance.dismiss('cancel');
 };
};

addPromiseCtrl.$inject = [
 '$uibModalInstance',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$log',
 'promiseLevels'];

angular.module("app.promises").controller('AddPromiseCtrl', addPromiseCtrl);
