var promisesMineCtrl = function (
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
 vm.promisesManager.getMyPromises();
};


promisesMineCtrl.$inject = [
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

angular.module("app.promises").controller('PromisesMineCtrl', promisesMineCtrl);
