var createGoalCtrl = function (
        ConstantsManager,
        level_categories,
        $uibModalInstance,
        WizardHandler,
        $scope,
        $state,
        $stateParams,
        $http,
        $rootScope,
        $location,
        $log,
        goalTypes) {
 var vm = this;
 vm.wizardHandler = WizardHandler;
 vm.goal = {};
 vm.goalLevels;
 vm.goalTypes = goalTypes;
 vm.selectedGoalType;
 vm.wizardCurrentStep = "Choose Goal Type";

 vm.constantsManager = new ConstantsManager();

 vm.getLevels = function (appId) {
  vm.constantsManager.getLevel(appId).then(function (data) {
   vm.goalLevels = data;
  });
 };

 vm.chooseGoalType = function (goalType) {
  vm.goal.goalTypeId = goalType.id;
  vm.selectedGoalType = goalType;
  vm.getLevels(goalType.id);
 };

 vm.next = function () {
  vm.wizardHandler.wizard('goal-form').next();
 };

 vm.previous = function (goalType) {
  vm.wizardHandler.wizard('goal-form').previous();
 };

 vm.ok = function () {
  $uibModalInstance.close(vm.goal);
 };

 vm.close = function () {
  $uibModalInstance.dismiss('cancel');
 };
};

createGoalCtrl.$inject = [
 'ConstantsManager',
 'level_categories',
 '$uibModalInstance',
 'WizardHandler',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$log',
 'goalTypes'];

angular.module("app.goal").controller('CreateGoalCtrl', createGoalCtrl);
