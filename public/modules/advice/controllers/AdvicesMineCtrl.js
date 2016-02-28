var advicesMineCtrl = function (
        ConstantsSrv,
        AdvicesSrv,
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
 vm.advicesSrv = new AdvicesSrv();
 vm.advicesSrv.getMyAdvices();
};


advicesMineCtrl.$inject = [
 'ConstantsSrv',
 'AdvicesSrv',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$uibModal',
 '$log',
 '$filter'];

angular.module("app.advice").controller('AdvicesMineCtrl', advicesMineCtrl);
