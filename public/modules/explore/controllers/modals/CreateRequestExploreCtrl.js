var createRequestExploreCtrl = function (
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
        requestOptions) {
 var vm = this;
 vm.wizardHandler = WizardHandler;
 vm.explore = {};
 ///vm.exploreRequestOptions;
 vm.requestOptions = requestOptions;
 vm.selectedAppType;
 vm.wizardCurrentStep = "Choose App";

 vm.constantsManager = new ConstantsManager();

 vm.getRequestOptions = function (appId) {
  vm.constantsManager.getRequestOption(appId).then(function (data) {
   vm.exploreRequestOptions = data;
  });
 };

 vm.chooseAppType = function (requestOption) {
  vm.explore.requestOptionId = requestOption.id;
  vm.selectedAppType = requestOption;
  vm.getRequestOptions(requestOption.id);
 };

 vm.next = function () {
  vm.wizardHandler.wizard('explore-form').next();
 };

 vm.previous = function (requestOption) {
  vm.wizardHandler.wizard('explore-form').previous();
 };

 vm.ok = function () {
  $uibModalInstance.close(vm.explore);
 };

 vm.close = function () {
  $uibModalInstance.dismiss('cancel');
 };
};

createRequestExploreCtrl.$inject = [
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
 'requestOptions'];

angular.module("app.explore").controller('CreateRequestExploreCtrl', createRequestExploreCtrl);
