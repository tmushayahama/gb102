var promisesAllCtrl = function (
        ConstantsManager,
        PromisesManager,
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

 vm.promisesManager = new PromisesManager();
 vm.promisesManager.getAllPromises();
};

promisesAllCtrl.$inject = [
 'ConstantsManager',
 'PromisesManager',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$uibModal',
 '$log',
 '$filter'];

angular.module("app.promises").controller('PromisesAllCtrl', promisesAllCtrl);
