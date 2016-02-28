var goalsMineCtrl = function (
        ConstantsSrv,
        GoalsSrv,
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
 vm.goalsSrv = new GoalsSrv();
 vm.goalsSrv.getMyGoals();
};


goalsMineCtrl.$inject = [
 'ConstantsSrv',
 'GoalsSrv',
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
