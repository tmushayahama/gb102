var teachsMineCtrl = function (
        ConstantsSrv,
        TeachsSrv,
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
 vm.teachsSrv = new TeachsSrv();
 vm.teachsSrv.getMyTeachs();
};


teachsMineCtrl.$inject = [
 'ConstantsSrv',
 'TeachsSrv',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$uibModal',
 '$log',
 '$filter'];

angular.module("app.teach").controller('TeachsMineCtrl', teachsMineCtrl);
