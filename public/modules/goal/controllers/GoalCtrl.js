
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

 vm.goal;
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

 vm.getGoal = function (id) {
  vm.goalManager.getGoal(id).then(function (data) {
   vm.goal = data;
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



 //--------init------

 vm.getGoal(vm.goalId);
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

angular.module("app.goal").controller('GoalCtrl', goalCtrl);