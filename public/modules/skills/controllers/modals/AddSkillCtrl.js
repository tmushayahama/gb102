var addSkillCtrl = function (
        $uibModalInstance,
        $scope,
        $state,
        $stateParams,
        $http,
        $rootScope,
        $location,
        $log,
        skillLevels) {
 var vm = this;

 vm.skill = "";
 vm.skillLevels = skillLevels;

 vm.ok = function () {
  $uibModalInstance.close(vm.skill);
 };

 vm.close = function () {
  $uibModalInstance.dismiss('cancel');
 };
};

addSkillCtrl.$inject = [
 '$uibModalInstance',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$log',
 'skillLevels'];

angular.module("app.skills").controller('AddSkillCtrl', addSkillCtrl);
