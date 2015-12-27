var goalsAllCtrl = function (
        ConstantsManager,
        GoalsManager,
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

 vm.goalsManager = new GoalsManager();
 vm.goalsManager.getAllGoals();
};

goalsAllCtrl.$inject = [
 'ConstantsManager',
 'GoalsManager',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$uibModal',
 '$log',
 '$filter'];

angular.module("app.goals").controller('GoalsAllCtrl', goalsAllCtrl);
