var goalManageCtrl = function (
        GoalManager,
        $state,
        $stateParams,
        $http,
        $q,
        $rootScope) {
 var vm = this;
 vm.goalId = $stateParams.goalId;
 vm.goals;
 vm.goalManager = new GoalManager();

 vm.getGoal = function (id) {
  vm.goalManager.getGoal(id).then(function (data) {
   vm.goal = data;
   vm.getSubGoals(vm.goal.explore_id);
  });
 };

 vm.getSubGoals = function (exploreId) {
  vm.goalManager.getSubGoals(exploreId).then(function (data) {
   vm.goals = data;
  });
 }

 vm.getGoal(vm.goalId);

};

goalManageCtrl.$inject = [
 'GoalManager',
 '$state',
 '$stateParams',
 '$http',
 '$q',
 '$rootScope'];

angular.module("app.goal").controller('GoalManageCtrl', goalManageCtrl);
