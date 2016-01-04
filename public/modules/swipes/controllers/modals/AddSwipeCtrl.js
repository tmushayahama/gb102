var addSwipeCtrl = function (
        $uibModalInstance,
        $scope,
        $state,
        $stateParams,
        $http,
        $rootScope,
        $location,
        $log,
        swipeLevels) {
 var vm = this;

 vm.swipe = "";
 vm.swipeLevels = swipeLevels;

 vm.ok = function () {
  $uibModalInstance.close(vm.swipe);
 };

 vm.close = function () {
  $uibModalInstance.dismiss('cancel');
 };
};

addSwipeCtrl.$inject = [
 '$uibModalInstance',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$log',
 'swipeLevels'];

angular.module("app.swipes").controller('AddSwipeCtrl', addSwipeCtrl);
