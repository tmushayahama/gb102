
var goalCtrl = function (
        _,
        ConstantsManager,
        GoalManager,
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

 vm.goal = [];
 var goalData = {
 };

 vm.range = function (min, max) {
  return _.range(min, max);
 };

 vm.goalIcons = [];
 vm.goalIconsArray = [];

 var getRand = function (min, max) {
  return Math.floor((Math.random() * max) + min);
 }

 vm.getRandomGoalIcons = function () {
  for (var i = 0; i < 5; i++) {
   var rowArray = [];
   for (var j = 0; j < vm.goalIcons.length; j++) {
    var rand = getRand(0, vm.goalIcons.length);
    rowArray.push(vm.goalIcons[rand].name);
   }
   vm.goalIconsArray.push(rowArray);
  }
 };


 vm.goalId = $stateParams.goalId;

 vm.goalManager = new GoalManager();
 vm.constantsManager = new ConstantsManager();

 vm.goalFormDisplay = false;

 vm.getGoal = function (id, data) {
  vm.goalManager.getGoal(id, data).success(function (response) {
   vm.goal = response;
  }).error(function (response) {
   console.log(response);
  });
 };




 vm.defaultGoalData = {
  goalId: $stateParams.goalId,
  privacy: 0
 }
 vm.newGoalData = angular.copy(vm.defaultGoalData);

 vm.showForm = function () {
  vm.FormDisplay = true;
 };

 vm.createGoal = function (data) {
  vm.goalManager.createGoal(data).then(function (response) {
   vm.FormDisplay = false;
   vm.newGoalData = angular.copy(vm.defaultGoalData);
   vm.goalCopy = angular.copy(vm.goalManager.goal);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editGoal = function (data) {
  vm.goalManager.editGoal(data).then(function (response) {
   vm.FormDisplay = false;
   vm.newGoalData = angular.copy(vm.defaultGoalData);
   vm.goalCopy = angular.copy(vm.goalManager.goal);
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
   (vm.goalManager.goal, {id: goalId}, true)[0]
   = angular.copy($filter('filter')
   (vm.goalCopy, {id: goalId}, true)[0]);
   if (goal.length && goalCopy.length) {
   // vm.goalManager.goal angular.copy(vm.goalCopy);
   }
   */
 };






 vm.edited = null;

 $scope.$watch(angular.bind(this, function () {
  return vm.goal;
 }), function () {
  //vm.remainingCount = filterFilter(goal, {completed: false}).length;
  vm.doneCount = vm.goalManager.goal.length - vm.remainingCount;
  vm.allChecked = !vm.remainingCount;
  //GoalService.put(vm.goal);
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

 //--------init------
 vm.goalManager.getGoal(vm.goalId);
 vm.constantsManager.getIcons(1).then(function (data) {
  vm.goalIcons = data;
  vm.getRandomGoalIcons();
 });
};

goalCtrl.$inject = ['_',
 'ConstantsManager',
 'GoalManager',
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

angular.module("app.goals").controller('GoalCtrl', goalCtrl);