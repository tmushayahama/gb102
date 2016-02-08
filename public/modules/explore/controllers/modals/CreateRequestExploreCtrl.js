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
 vm.exploreLevels;
 vm.requestOptions = requestOptions;
 vm.selectedRequestOption;
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

 vm.chooseRequestOption = function (requestOption) {
  vm.explore.requestOptionId = requestOption.id;
  vm.explore.app_type_id = requestOption.level.app_type_id;
  vm.explore.parent_explore_id = requestOption.explore_id;
  vm.explore.title = requestOption.explore.title;
  vm.explore.description = requestOption.explore.description;
  vm.selectedRequestOption = requestOption;
  vm.getLevels(requestOption.level.app_type_id);
  vm.getRequestTypes(requestOption.level.app_type_id);
 };

 vm.next = function () {
  vm.wizardHandler.wizard('explore-form').next();
 };

 vm.previous = function (requestOption) {
  vm.wizardHandler.wizard('explore-form').previous();
 };

 vm.ok = function () {
  vm.explore.explore_requests = [];
  angular.forEach(vm.selectedRequestTypes, function (selectedRequestType) {
   vm.explore.explore_requests.push(selectedRequestType.exploreRequest);
  });
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
