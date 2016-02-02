var advicesMineCtrl = function (
        ConstantsManager,
        AdvicesManager,
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
 vm.advicesManager = new AdvicesManager();
 vm.advicesManager.getMyAdvices();
};


advicesMineCtrl.$inject = [
 'ConstantsManager',
 'AdvicesManager',
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
