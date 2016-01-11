var exploresMineCtrl = function (
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
 vm.exploresManager.getMyExplores();
};


exploresMineCtrl.$inject = [
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

angular.module("app.explore").controller('ExploresMineCtrl', exploresMineCtrl);