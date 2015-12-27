var addHobbyCtrl = function (
        $uibModalInstance,
        $scope,
        $state,
        $stateParams,
        $http,
        $rootScope,
        $location,
        $log,
        hobbyLevels) {
 var vm = this;

 vm.hobby = "";
 vm.hobbyLevels = hobbyLevels;

 vm.ok = function () {
  $uibModalInstance.close(vm.hobby);
 };

 vm.close = function () {
  $uibModalInstance.dismiss('cancel');
 };
};

addHobbyCtrl.$inject = [
 '$uibModalInstance',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$log',
 'hobbyLevels'];

angular.module("app.hobbys").controller('AddHobbyCtrl', addHobbyCtrl);
