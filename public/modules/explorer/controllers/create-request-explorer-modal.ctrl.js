var createRequestExplorerCtrl = function (
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
        requestOptions) {
 var vm = this;
 vm.wizardHandler = WizardHandler;
 vm.explorer = {};
 vm.explorerLevels;
 vm.requestOptions = requestOptions;
 vm.selectedRequestOption;
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

 vm.chooseRequestOption = function (requestOption) {
  vm.explorer.requestOptionId = requestOption.id;
  vm.explorer.app_type_id = requestOption.level.app_type_id;
  vm.explorer.parent_explorer_id = requestOption.explorer_id;
  vm.explorer.title = requestOption.explorer.title;
  vm.explorer.description = requestOption.explorer.description;
  vm.selectedRequestOption = requestOption;
  vm.getLevels(requestOption.level.app_type_id);
  vm.getRequestTypes(requestOption.level.app_type_id);
 };

 vm.next = function () {
  vm.wizardHandler.wizard('explorer-form').next();
 };

 vm.previous = function (requestOption) {
  vm.wizardHandler.wizard('explorer-form').previous();
 };

 vm.ok = function () {
  vm.explorer.explorer_requests = [];
  angular.forEach(vm.selectedRequestTypes, function (selectedRequestType) {
   vm.explorer.explorer_requests.push(selectedRequestType.explorerRequest);
  });
  $uibModalInstance.close(vm.explorer);
 };

 vm.close = function () {
  $uibModalInstance.dismiss('cancel');
 };
};

createRequestExplorerCtrl.$inject = [
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
 'requestOptions'];

angular.module("app.explorer").controller('CreateRequestExplorerCtrl', createRequestExplorerCtrl);
