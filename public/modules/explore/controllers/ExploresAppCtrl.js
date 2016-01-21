var exploresAppCtrl = function (
        ConstantsManager,
        ExploresManager,
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

 vm.appName = $stateParams.app_name;

 vm.exploresManager = new ExploresManager();
 vm.exploresManager.getAppExplores(vm.appName);
};

exploresAppCtrl.$inject = [
 'ConstantsManager',
 'ExploresManager',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$uibModal',
 '$log',
 '$filter'];

angular.module("app.explore").controller('ExploresAppCtrl', exploresAppCtrl);
