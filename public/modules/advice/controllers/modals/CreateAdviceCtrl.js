var createAdviceCtrl = function (
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
        adviceTypes) {
 var vm = this;
 vm.wizardHandler = WizardHandler;
 vm.advice = {};
 vm.adviceLevels;
 vm.adviceTypes = adviceTypes;
 vm.selectedAdviceType;
 vm.wizardCurrentStep = "Choose Advice Type";

 vm.constantsManager = new ConstantsManager();

 vm.getLevels = function (appId) {
  vm.constantsManager.getLevel(appId).then(function (data) {
   vm.adviceLevels = data;
  });
 };

 vm.chooseAdviceType = function (adviceType) {
  vm.advice.adviceTypeId = adviceType.id;
  vm.selectedAdviceType = adviceType;
  vm.getLevels(adviceType.id);
 };

 vm.next = function () {
  vm.wizardHandler.wizard('advice-form').next();
 };

 vm.previous = function (adviceType) {
  vm.wizardHandler.wizard('advice-form').previous();
 };

 vm.ok = function () {
  $uibModalInstance.close(vm.advice);
 };

 vm.close = function () {
  $uibModalInstance.dismiss('cancel');
 };
};

createAdviceCtrl.$inject = [
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
 'adviceTypes'];

angular.module("app.advice").controller('CreateAdviceCtrl', createAdviceCtrl);
