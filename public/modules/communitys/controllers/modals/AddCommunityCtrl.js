var addCommunityCtrl = function (
        $uibModalInstance,
        $scope,
        $state,
        $stateParams,
        $http,
        $rootScope,
        $location,
        $log,
        communityLevels) {
 var vm = this;

 vm.community = "";
 vm.communityLevels = communityLevels;

 vm.ok = function () {
  $uibModalInstance.close(vm.community);
 };

 vm.close = function () {
  $uibModalInstance.dismiss('cancel');
 };
};

addCommunityCtrl.$inject = [
 '$uibModalInstance',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$log',
 'communityLevels'];

angular.module("app.communitys").controller('AddCommunityCtrl', addCommunityCtrl);
