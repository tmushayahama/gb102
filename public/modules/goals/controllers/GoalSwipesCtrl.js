var goalSwipesCtrl = function (
        level_categories,
        ConstantsManager,
        GoalSwipesManager,
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

 vm.constantsManager = new ConstantsManager();
 vm.currentGoalSwipe;
 vm.goalSwipeLevels;

 vm.getGoalSwipe = function () {
  vm.goalSwipesManager.getGoalSwipe().then(function (response) {
   vm.currentGoalSwipe = response;
  });
 };

 vm.createGoalSwipe = function (goalId, levelId) {
  var data = {
   goalId: goalId,
   levelId: levelId,
   description: ""
  };
  vm.goalSwipesManager.createGoalSwipe(data).then(function (response) {
   //vm.currentGoalSwipe = response;
  });
  vm.getGoalSwipe();
 };

 vm.viewGoalSwipes = function () {
  vm.goalSwipesManager.getGoalSwipes();
 };

 vm.goalSwipesManager = new GoalSwipesManager();
 vm.getGoalSwipe();
 vm.constantsManager.getLevel(level_categories.goal_swipe).then(function (data) {
  vm.goalSwipeLevels = data;
 });

};


goalSwipesCtrl.$inject = [
 'level_categories',
 'ConstantsManager',
 'GoalSwipesManager',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$uibModal',
 '$log',
 '$filter'];

angular.module("app.goals").controller('GoalSwipesCtrl', goalSwipesCtrl);
