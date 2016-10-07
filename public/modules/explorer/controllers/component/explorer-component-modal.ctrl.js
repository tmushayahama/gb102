var explorerComponentCtrl = function (
        level_categories,
        ComponentsSrv,
        $uibModalInstance,
        $scope,
        $state,
        $stateParams,
        $http,
        $rootScope,
        $location,
        $log,
        explorerComponentData,
        appsConstants) {
 var vm = this;
 vm.explorerId = explorerComponentData.explorer_id;
 vm.explorerComponentId = explorerComponentData.id;
 vm.componentBackgroundColors = appsConstants[level_categories.component_background_colors];
 vm.componentsSrv = new ComponentsSrv();
 vm.explorerComponent = explorerComponentData;
 vm.explorerSubComponents;
 vm.componentId = explorerComponentData.id;
 vm.componentFormDisplay = false;
 vm.componentSettingsDisplay = false;
 vm.defaultExplorerComponentData = {
  explorerId: vm.explorerId,
  typeId: level_categories.component.none,
  title: "",
  description: "",
  privacy: 0
 };
 vm.getDefaultExplorerComponentData = function (parentComponentId) {
  var result = angular.copy(vm.defaultExplorerComponentData);
  if (parentComponentId) {
   result.parentComponentId = parentComponentId;
  }
  return result;
 };
 vm.explorerComponent.newExplorerComponentData = vm.getDefaultExplorerComponentData(vm.explorerComponent.id);
 vm.ok = function () {
  $uibModalInstance.close();
 };
 vm.close = function () {
  $uibModalInstance.dismiss('cancel');
 };
 vm.createComponent = function (parentExplorerComponent) {
  vm.componentsSrv.createExplorerComponent(parentExplorerComponent.newExplorerComponentData).then(function (response) {

   parentExplorerComponent.explorerComponents.push(response);
   parentExplorerComponent.newExplorerComponentData = vm.getDefaultExplorerComponentData(parentExplorerComponent.newExplorerComponentData.parentComponentId);
  }, function (response) {
   console.log(response);
  });
 };
 vm.getComponents = function (component, resultFormat) {
  vm.componentsSrv.getComponents(component.id, resultFormat).then(function (response) {
   vm.explorerComponent = component;
   vm.explorerComponent.components = response;
   vm.explorerComponent.newExplorerComponentData = vm.getDefaultExplorerComponentData();
  }, function (error) {
   console.log(error);
  });
 };
 vm.editExplorerComponent = function (data) {
  vm.componentsSrv.editExplorerComponent(data).then(function (response) {
   vm.editDecriptionMode = false;
  }, function (response) {
   console.log(response);
  });
 };
 vm.editComponentBackground = function (data) {
  vm.componentsSrv.editComponentBackground(data).then(function (response) {
   vm.explorerComponent.background_color = response;
   vm.explorerComponent.background_color_id = response.id;
  }, function (response) {
   console.log(response);
  });
 };
 vm.editExplorerComponentSections = {
  details: function () {
   var explorerComponentData = {
    explorerComponentId: vm.explorerComponent.id,
    title: vm.explorerComponent.title,
    description: vm.explorerComponent.description
   };
   vm.editExplorerComponent(explorerComponentData);
  },
  backgroundColor: function (backgroundColorId) {
   var componentData = {
    componentId: vm.explorerComponent.id,
    backgroundColorId: backgroundColorId
   };
   vm.editComponentBackground(componentData);
  }
 };
 vm.showComponentForm = function () {
  vm.componentFormDisplay = true;
 };
 vm.upGotoComponent = function (component, resultFormat) {

  vm.componentsSrv.getComponents(component.parent_component_id, resultFormat).then(function (componentResponse) {
   vm.componentsSrv.getComponent(component.parent_component_id, resultFormat).then(function (parentComponentResponse) {
    vm.explorerComponent = parentComponentResponse;
    vm.explorerComponent.components = componentResponse;
    vm.explorerComponent.newExplorerComponentData = vm.getDefaultExplorerComponentData();
   }, function (error) {
    console.log(error);
   });
  });
 };
 //--------init------
 vm.getComponents(vm.explorerComponent, 2);
};
explorerComponentCtrl.$inject = [
 'level_categories',
 'ComponentsSrv',
 '$uibModalInstance',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$log',
 'explorerComponentData',
 'appsConstants'];
angular.module("app.explorer").controller('ExplorerComponentCtrl', explorerComponentCtrl);
