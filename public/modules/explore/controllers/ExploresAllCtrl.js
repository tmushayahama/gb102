var exploresAllCtrl = function (
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

 vm.exploresManager = new ExploresManager();
 vm.exploresManager.getAllExplores();
};

exploresAllCtrl.$inject = [
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

angular.module("app.explore").controller('ExploresAllCtrl', exploresAllCtrl);