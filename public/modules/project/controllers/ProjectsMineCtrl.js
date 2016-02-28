var projectsMineCtrl = function (
        ConstantsSrv,
        ProjectsSrv,
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
 vm.projectsSrv = new ProjectsSrv();
 vm.projectsSrv.getMyProjects();
};


projectsMineCtrl.$inject = [
 'ConstantsSrv',
 'ProjectsSrv',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$uibModal',
 '$log',
 '$filter'];

angular.module("app.project").controller('ProjectsMineCtrl', projectsMineCtrl);
