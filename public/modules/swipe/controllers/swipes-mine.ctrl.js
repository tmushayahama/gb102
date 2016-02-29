var swipesMineCtrl = function (
        ConstantsSrv,
        SwipesSrv,
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
 vm.swipesSrv = new SwipesSrv();
 vm.swipesSrv.getMySwipes();
};


swipesMineCtrl.$inject = [
 'ConstantsSrv',
 'SwipesSrv',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$uibModal',
 '$log',
 '$filter'];

angular.module("app.swipe").controller('SwipesMineCtrl', swipesMineCtrl);