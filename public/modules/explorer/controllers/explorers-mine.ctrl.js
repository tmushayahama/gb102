var explorersMineCtrl = function (
        ConstantsSrv,
        ComponentsSrv,
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
 vm.ComponentsSrv = new ComponentsSrv();
 vm.ComponentsSrv.getMyExplorers();
};


explorersMineCtrl.$inject = [
 'ConstantsSrv',
 'ComponentsSrv',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$uibModal',
 '$log',
 '$filter'];

angular.module("app.explorer").controller('ExplorersMineCtrl', explorersMineCtrl);
