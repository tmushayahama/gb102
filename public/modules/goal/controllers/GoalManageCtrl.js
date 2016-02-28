var goalManageCtrl = function (
        GoalSrv,
        $state,
        $stateParams,
        $http,
        $q,
        $rootScope) {
 var vm = this;
 vm.goalId = $stateParams.goalId;
 vm.goals;
 vm.goalSrv = new GoalSrv();

 vm.getGoal = function (id) {
  vm.goalSrv.getGoal(id).then(function (data) {
   vm.goal = data;
   vm.getSubGoals(vm.goal.explorer_id);
  });
 };

 vm.getSubGoals = function (explorerId) {
  vm.goalSrv.getSubGoals(explorerId).then(function (data) {
   vm.goals = data;
  });
 }

 vm.getGoal(vm.goalId);

};

goalManageCtrl.$inject = [
 'GoalSrv',
 '$state',
 '$stateParams',
 '$http',
 '$q',
 '$rootScope'];

angular.module("app.goal").controller('GoalManageCtrl', goalManageCtrl);
