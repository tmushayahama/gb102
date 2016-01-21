var menuModalCtrl = function (
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
        appTypes) {
 var vm = this;
 vm.wizardHandler = WizardHandler;
 vm.explore = {};
 vm.exploreLevels;
 vm.appTypes = appTypes;
 vm.selectedAppType;
 vm.wizardCurrentStep = "Choose App";

 vm.constantsManager = new ConstantsManager();

 vm.getLevels = function (appId) {
  vm.constantsManager.getLevel(appId).then(function (data) {
   vm.exploreLevels = data;
  });
 };

 vm.chooseAppType = function (appType) {
  vm.explore.appTypeId = appType.id;
  vm.selectedAppType = appType;
  vm.getLevels(appType.id);
 };

 vm.next = function () {
  vm.wizardHandler.wizard('explore-form').next();
 };

 vm.previous = function (appType) {
  vm.wizardHandler.wizard('explore-form').previous();
 };

 vm.ok = function () {
  $uibModalInstance.close(vm.explore);
 };

 vm.close = function () {
  $uibModalInstance.dismiss('cancel');
 };
};

menuModalCtrl.$inject = [
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
 'appTypes'];

angular.module("app").controller('MenuModalCtrl', menuModalCtrl);
