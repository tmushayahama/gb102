var addCollaborationCtrl = function (
        $uibModalInstance,
        $scope,
        $state,
        $stateParams,
        $http,
        $rootScope,
        $location,
        $log,
        collaborationLevels) {
 var vm = this;

 vm.collaboration = "";
 vm.collaborationLevels = collaborationLevels;

 vm.ok = function () {
  $uibModalInstance.close(vm.collaboration);
 };

 vm.close = function () {
  $uibModalInstance.dismiss('cancel');
 };
};

addCollaborationCtrl.$inject = [
 '$uibModalInstance',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$log',
 'collaborationLevels'];

angular.module("app.collaborations").controller('AddCollaborationCtrl', addCollaborationCtrl);
