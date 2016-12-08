var componentCtrl = function (
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
        componentId,
        appsConstants) {
 var vm = this;
 vm.componentId = componentId;
 vm.componentBackgroundColors = appsConstants[level_categories.component_background_colors];
 vm.componentsSrv = new ComponentsSrv();
 vm.componentFormDisplay = false;
 vm.componentSettingsDisplay = false;
 vm.selectedApp = $rootScope.sections[0];
 vm.defaultComponentData = {
  explorerId: vm.explorerId,
  typeId: level_categories.component.none,
  title: "",
  description: "",
  privacy: 0
 };

 vm.getDefaultComponentData = function (parentComponentId) {
  var result = angular.copy(vm.defaultComponentData);
  if (parentComponentId) {
   result.parentComponentId = parentComponentId;
  }
  return result;
 };

 vm.ok = function () {
  $uibModalInstance.close();
 };

 vm.close = function () {
  $uibModalInstance.dismiss('cancel');
 };

 vm.selectApp = function (app) {
  vm.selectedApp = app;
 };

 vm.createComponent = function (parentComponent) {
  parentComponent.newComponentData.parentComponentId = parentComponent.id;
  parentComponent.newComponentData.typeId = vm.selectedApp.id;

  vm.componentsSrv.createComponent(parentComponent.newComponentData).then(function (response) {
   parentComponent.components[vm.selectedApp.id].components.push(response);
   parentComponent.newComponentData = vm.getDefaultComponentData(parentComponent.newComponentData.parentComponentId);
  }, function (response) {
   console.log(response);
  });
 };

 vm.getComponent = function (componentId, listFormat) {
  vm.componentsSrv.getComponent(componentId, listFormat).then(function (response) {
   vm.component = response;
   vm.component.newComponentData = vm.getDefaultComponentData();
  }, function (error) {
   console.log(error);
  });
 };

 vm.editComponentDescription = function (data) {
  vm.componentsSrv.editComponentDescription(data).then(function (response) {
   vm.component.title = response.title;
   vm.component.description = response.description;
   vm.editDecriptionMode = false;
  }, function (response) {
   console.log(response);
  });
 };

 vm.editComponentBackground = function (data) {
  vm.componentsSrv.editComponentBackground(data).then(function (response) {
   vm.component.background_color = response;
   vm.component.background_color_id = response.id;
  }, function (response) {
   console.log(response);
  });
 };

 vm.editComponentSections = {
  details: function () {
   var componentData = {
    componentId: vm.component.id,
    title: vm.component.title,
    description: vm.component.description
   };
   vm.editComponentDescription(componentData);
  },
  backgroundColor: function (backgroundColorId) {
   var componentData = {
    componentId: vm.component.id,
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
    vm.component = parentComponentResponse;
    vm.component.components = componentResponse;
    vm.component.newComponentData = vm.getDefaultComponentData();
   }, function (error) {
    console.log(error);
   });
  });
 };

 //--------init------
 vm.getComponent(vm.componentId, 2);
};
componentCtrl.$inject = [
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
 'componentId',
 'appsConstants'];
angular.module("app.explorer").controller('ComponentCtrl', componentCtrl);