var communitysAllCtrl = function (
        ConstantsManager,
        CommunitysManager,
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

 vm.communitysManager = new CommunitysManager();
 vm.communitysManager.getAllCommunitys();
};

communitysAllCtrl.$inject = [
 'ConstantsManager',
 'CommunitysManager',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$uibModal',
 '$log',
 '$filter'];

angular.module("app.communitys").controller('CommunitysAllCtrl', communitysAllCtrl);
