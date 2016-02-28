var explorersMineCtrl = function (
        ConstantsSrv,
        ExplorersSrv,
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
 vm.explorersSrv = new ExplorersSrv();
 vm.explorersSrv.getMyExplorers();
};


explorersMineCtrl.$inject = [
 'ConstantsSrv',
 'ExplorersSrv',
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
