var addAdviceCtrl = function (
        $uibModalInstance,
        $scope,
        $state,
        $stateParams,
        $http,
        $rootScope,
        $location,
        $log,
        adviceLevels) {
 var vm = this;

 vm.advice = "";
 vm.adviceLevels = adviceLevels;

 vm.ok = function () {
  $uibModalInstance.close(vm.advice);
 };

 vm.close = function () {
  $uibModalInstance.dismiss('cancel');
 };
};

addAdviceCtrl.$inject = [
 '$uibModalInstance',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$log',
 'adviceLevels'];

angular.module("app.advices").controller('AddAdviceCtrl', addAdviceCtrl);
