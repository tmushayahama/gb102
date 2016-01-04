var addExploreCtrl = function (
        $uibModalInstance,
        WizardHandler,
        $scope,
        $state,
        $stateParams,
        $http,
        $rootScope,
        $location,
        $log,
        exploreLevels,
        appTypes) {
 var vm = this;
 vm.wizardHandler = WizardHandler;
 vm.explore = "";
 vm.exploreLevels = exploreLevels;
 vm.appTypes = appTypes;
 vm.wizardCurrentStep = "Choose App";

 vm.next = function (appType) {
  //vm.wizardCurrentStep = vm.wizardHandler.wizard('explore-form').currentStepNumber();
  vm.wizardHandler.wizard('explore-form').next();
 };

 vm.previous = function (appType) {
  vm.wizardHandler.wizard('explore-form').previous();
  //vm.wizardCurrentStep = vm.wizardHandler.wizard('explore-form').currentStepNumber();

 };

 vm.ok = function () {
  $uibModalInstance.close(vm.explore);
 };

 vm.close = function () {
  $uibModalInstance.dismiss('cancel');
 };
};

addExploreCtrl.$inject = [
 '$uibModalInstance',
 'WizardHandler',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$log',
 'exploreLevels',
 'appTypes'];

angular.module("app.explores").controller('AddExploreCtrl', addExploreCtrl);
