var advicesAllCtrl = function (
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
 vm.advicesManager.getAllAdvices();
};

advicesAllCtrl.$inject = [
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

angular.module("app.advices").controller('AdvicesAllCtrl', advicesAllCtrl);
