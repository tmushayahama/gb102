var addProfileCtrl = function (
        $uibModalInstance,
        $scope,
        $state,
        $stateParams,
        $http,
        $rootScope,
        $location,
        $log,
        profileLevels) {
 var vm = this;

 vm.profile = "";
 vm.profileLevels = profileLevels;

 vm.ok = function () {
  $uibModalInstance.close(vm.profile);
 };

 vm.close = function () {
  $uibModalInstance.dismiss('cancel');
 };
};

addProfileCtrl.$inject = [
 '$uibModalInstance',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$log',
 'profileLevels'];

angular.module("app.profile").controller('AddProfileCtrl', addProfileCtrl);
