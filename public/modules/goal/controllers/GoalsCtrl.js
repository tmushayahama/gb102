
var goalsCtrl = function (
        level_categories,
        ConstantsManager,
        SearchManager,
        GoalsManager,
        $scope,
        $state,
        $stateParams,
        $http,
        $rootScope,
        $location,
        $uibModal,
        $log,
        $filter,
        $css) {

 var vm = this;

 $css.bind({
  href: 'public/css/gb-sass/stylesheets/gb-themes/app-theme-goal.css'
 }, $scope);

 vm.goalsManager = new GoalsManager();
 vm.constantsManager = new ConstantsManager();
 $rootScope.appName = 'GOALR';
 vm.goalLevels;
 vm.goalTypes;


 $scope.superhero = {
  selected: 'Batman'
 };

 $scope.$watch('superhero.selected', function (newVal, oldVal) {
  /*      if (newVal !== oldVal) {
   if ($scope.superheroes.indexOf(newVal) === -1) {
   $scope.superheroes.unshift(newVal);
   }
   }*/
 });

 vm.createGoal = function (data) {
  vm.goalsManager.createGoal(data).then(function (response) {
   vm.FormDisplay = false;
   vm.newGoalData = angular.copy(vm.defaultGoalData);
   vm.goalsCopy = angular.copy(vm.goalsManager.goals);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editGoal = function (data) {
  vm.goalsManager.editGoal(data).then(function (response) {
   vm.FormDisplay = false;
   vm.newGoalData = angular.copy(vm.defaultGoalData);
   vm.goalsCopy = angular.copy(vm.goalsManager.goals);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editGoalSections = {
  details: function (goalId, detail) {
   var goalData = {
    goalId: goalId,
    title: detail.title,
    description: detail.description
   };
   vm.editGoal(goalData);
  }
 }

 vm.cancelGoal = function (form) {
  vm.FormDisplay = false;
  vm.newGoalData = angular.copy(vm.defaultGoalData)
  if (form) {
   form.$setPristine();
   form.$setUntouched();
  }
 };

 vm.revertGoal = function (goal, goalCopy) {
  goal = goalCopy;
  /*
   $filter('filter')
   (vm.goalsManager.goals, {id: goalId}, true)[0]
   = angular.copy($filter('filter')
   (vm.goalsCopy, {id: goalId}, true)[0]);
   if (goal.length && goalCopy.length) {
   // vm.goalsManager.goals angular.copy(vm.goalsCopy);
   }
   */
 };






 vm.edited = null;

 $scope.$watch(angular.bind(this, function () {
  return vm.goals;
 }), function () {
  //vm.remainingCount = filterFilter(goals, {completed: false}).length;
  vm.doneCount = vm.goalsManager.goals.length - vm.remainingCount;
  vm.allChecked = !vm.remainingCount;
  //GoalService.put(vm.goals);
 }, true);
 /*
  $scope.$watch(angular.bind(this, function () {
  return vm.location.path();
  }), function (path) {
  vm.statusFilter = (path === '/active') ?
  {completed: false} : (path === '/completed') ?
  {completed: true} : null;
  });
  */




 vm.edit = function (goal) {
  vm.edited = goal;
  // Clone the original goal to restore it on demand.
  vm.original = angular.copy(goal);
 };


 vm.doneEditing = function (goal) {
  vm.edited = null;
  goal.title = goal.title.trim();

  if (!goal.title) {
   vm.remove(goal);
  }
 };

 $rootScope.openAddExploreModal = function () {
  var modalInstance = $uibModal.open({
   animation: true,
   templateUrl: 'create-goal-modal.html',
   controller: 'CreateGoalCtrl as createGoalCtrl',
   backdrop: 'static',
   size: 'xl',
   resolve: {
    goalTypes: function () {
     return vm.goalTypes;
    }
   }
  });

  modalInstance.result.then(function (goal) {
   vm.goalsManager.createGoal(goal);
  }, function () {
   $log.info('Modal dismissed at: ' + new Date());
  });
 };

 //--------init------
 vm.constantsManager.getLevel(level_categories.goal).then(function (data) {
  vm.goalTypes = data;
 });
 vm.constantsManager.getLevel(level_categories.goal).then(function (data) {
  vm.goalLevels = data;
 });
};

goalsCtrl.$inject = [
 'level_categories',
 'ConstantsManager',
 'SearchManager',
 'GoalsManager',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$uibModal',
 '$log',
 '$filter',
 '$css'];

angular.module("app.goal").controller('GoalsCtrl', goalsCtrl);