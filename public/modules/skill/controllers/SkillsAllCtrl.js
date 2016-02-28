var skillsAllCtrl = function (
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
 vm.skillsSrv.getAllSkills();
};

skillsAllCtrl.$inject = [
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

angular.module("app.skills").controller('SkillsAllCtrl', skillsAllCtrl);
