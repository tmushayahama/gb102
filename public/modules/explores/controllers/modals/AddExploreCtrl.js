var addExploreCtrl = function (
        $uibModalInstance,
        $scope,
        $state,
        $stateParams,
        $http,
        $rootScope,
        $location,
        $log,
        exploreLevels,
        appTypes) {
 var vm = this;

 vm.explore = "";
 vm.exploreLevels = exploreLevels;
 vm.appTypes = appTypes;

 vm.ok = function () {
  $uibModalInstance.close(vm.explore);
 };

 vm.close = function () {
  $uibModalInstance.dismiss('cancel');
 };
};

addExploreCtrl.$inject = [
 '$uibModalInstance',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$log',
 'exploreLevels',
 'appTypes'];

angular.module("app.explores").controller('AddExploreCtrl', addExploreCtrl);
