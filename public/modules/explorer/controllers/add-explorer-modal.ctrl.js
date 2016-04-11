var addExplorerCtrl = function (
        ConstantsSrv,
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
 vm.explorer = {};
 vm.explorerLevels;
 vm.requestTypes;
 vm.appTypes = appTypes;
 vm.selectedAppType;
 vm.wizardCurrentStep = "Choose App";

 vm.constantsSrv = new ConstantsSrv();

 vm.getLevels = function (appId) {
  vm.constantsSrv.getLevel(appId).then(function (data) {
   vm.explorerLevels = data;
  });
 };

 vm.getRequestTypes = function (appId) {
  vm.constantsSrv.getLevel(appId + level_categories.request_type_offset).then(function (data) {
   vm.requestTypes = [];
   angular.forEach(data, function (requestLevel) {
    vm.requestTypes.push(
            {
             requestLevel: requestLevel,
             explorerRequest: {
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
  vm.explorer.app_type_id = appType.id;
  vm.selectedAppType = appType;
  vm.getLevels(appType.id);
  vm.getRequestTypes(appType.id);
 };

 vm.next = function () {
  vm.wizardHandler.wizard('explorer-form').next();
 };

 vm.previous = function (appType) {
  vm.wizardHandler.wizard('explorer-form').previous();
 };

 vm.ok = function () {
  vm.explorer.explorer_requests = [];
  vm.explorer.explorer_picture_url = 'default.png';
  angular.forEach(vm.selectedRequestTypes, function (selectedRequestType) {
   vm.explorer.explorer_requests.push(selectedRequestType.explorerRequest);
  });

  $uibModalInstance.close(vm.explorer);
 };

 vm.close = function () {
  $uibModalInstance.dismiss('cancel');
 };
};

addExplorerCtrl.$inject = [
 'ConstantsSrv',
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

angular.module("app.explorer").controller('AddExplorerCtrl', addExplorerCtrl);
