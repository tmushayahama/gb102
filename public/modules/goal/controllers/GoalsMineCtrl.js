var goalsMineCtrl = function (
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
 vm.goalsManager.getMyGoals();
};


goalsMineCtrl.$inject = [
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

angular.module("app.goal").controller('GoalsMineCtrl', goalsMineCtrl);
