var addExploreCtrl = function (
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
 vm.requestTypes;
 vm.appTypes = appTypes;
 vm.selectedAppType;
 vm.wizardCurrentStep = "Choose App";

 vm.constantsManager = new ConstantsManager();

 vm.getLevels = function (appId) {
  vm.constantsManager.getLevel(appId).then(function (data) {
   vm.exploreLevels = data;
  });
 };

 vm.getRequestTypes = function (appId) {
  vm.constantsManager.getLevel(appId + level_categories.request_type_offset).then(function (data) {
   vm.requestTypes = [];
   angular.forEach(data, function (requestLevel) {
    vm.requestTypes.push(
            {
             requestLevel: requestLevel,
             exploreRequest: {
              levelId: requestLevel.id,
              description: ''
             }
            }
    );
   });
  }
  )
 };

 vm.chooseAppType = function (appType) {
  vm.explore.appTypeId = appType.id;
  vm.selectedAppType = appType;
  vm.getLevels(appType.id);
  vm.getRequestTypes(appType.id);
 };

 vm.next = function () {
  vm.wizardHandler.wizard('explore-form').next();
 };

 vm.previous = function (appType) {
  vm.wizardHandler.wizard('explore-form').previous();
 };

 vm.ok = function () {
  vm.explore.exploreRequests = [];
  angular.forEach(vm.selectedRequestTypes, function (selectedRequestType) {
   vm.explore.exploreRequests.push(selectedRequestType.exploreRequest);
  });

  $uibModalInstance.close(vm.explore);
 };

 vm.close = function () {
  $uibModalInstance.dismiss('cancel');
 };
};

addExploreCtrl.$inject = [
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

angular.module("app.explore").controller('AddExploreCtrl', addExploreCtrl);
