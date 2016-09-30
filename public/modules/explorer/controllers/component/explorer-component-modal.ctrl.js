var explorerComponentCtrl = function (
        ExplorerComponentsSrv,
        $uibModalInstance,
        $scope,
        $state,
        $stateParams,
        $http,
        $rootScope,
        $location,
        $log,
        explorerComponentData,
        componentBackgroundColors) {
 var vm = this;
 vm.explorerId = explorerComponentData.explorer_id;
 vm.explorerComponentId = explorerComponentData.id;
 vm.componentBackgroundColors = componentBackgroundColors;
 vm.explorerComponentsSrv = new ExplorerComponentsSrv();
 vm.explorerComponent = explorerComponentData;
 vm.explorerSubComponents;
 vm.componentId = explorerComponentData.component_id;
 vm.componentFormDisplay = false;
 vm.componentSettingsDisplay = false;

 vm.toggleComponentSettingsDisplay = function () {
  vm.componentSettingsDisplay = !vm.componentSettingsDisplay;
 }

 vm.ok = function () {
  $uibModalInstance.close();
 };
 vm.close = function () {
  $uibModalInstance.dismiss('cancel');
 };
 // vm.newExplorerComponentData = vm.defaultExplorerComponentData;

 vm.getExplorerComponent = function (explorerId, componentId) {
  vm.explorerComponentsSrv.getExplorerComponent(explorerId, componentId).then(function (response) {
   vm.explorerComponent = response;
  }, function (error) {
   console.log(error);
  });
 };
 vm.getSubComponents = function (componentId) {
  vm.explorerComponentsSrv.getSubComponents(componentId).then(function (response) {
   vm.explorerSubComponents = response;

   angular.forEach(response, function (step, key) {
    vm.explorerComponentsSrv.getSubComponents(step.id).then(function (stepResponse) {
     vm.explorerSubComponents[key].steps = stepResponse;
    });
   });
  }, function (error) {
   console.log(error);
  });
 };
 vm.editExplorerComponent = function (data) {
  vm.explorerComponentsSrv.editExplorerComponent(data).then(function (response) {
   vm.editDecriptionMode = false;
  }, function (response) {
   console.log(response);
  });
 };

 vm.editExplorerComponentSections = {
  details: function () {
   var explorerComponentData = {
    explorerComponentId: vm.explorerComponent.component.id,
    title: vm.explorerComponent.component.title,
    description: vm.explorerComponent.component.description
   };
   vm.editExplorerComponent(explorerComponentData);
  }
 };
 vm.showComponentForm = function () {
  vm.componentFormDisplay = true;
 };
 //--------init------
 //vm.getExplorerComponent(vm.explorerId, vm.componentId);
 vm.getSubComponents(vm.componentId);
};
explorerComponentCtrl.$inject = [
 'ExplorerComponentsSrv',
 '$uibModalInstance',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$log',
 'explorerComponentData',
 'componentBackgroundColors'];
angular.module("app.explorer").controller('ExplorerComponentCtrl', explorerComponentCtrl);
