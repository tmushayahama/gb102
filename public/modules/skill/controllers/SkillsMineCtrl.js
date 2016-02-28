var skillsMineCtrl = function (
        ConstantsSrv,
        SkillsSrv,
        $scope,
        $state,
        $stateParams,
        $http,
        $rootScope,
        $location,
        $uibModal,
        $log,
        $filter) {

 var vm = this;
 vm.skillsSrv = new SkillsSrv();
 vm.skillsSrv.getMySkills();
};


skillsMineCtrl.$inject = [
 'ConstantsSrv',
 'SkillsSrv',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$uibModal',
 '$log',
 '$filter'];

angular.module("app.skills").controller('SkillsMineCtrl', skillsMineCtrl);
