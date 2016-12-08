var componentsCtrl = function (
        ComponentsSrv,
        angularGridInstance,
        $scope,
        $state,
        $stateParams,
        $http,
        $rootScope,
        $location,
        $uibModal,
        $log,
        $filter) {

 var vm = this;
 vm.explorerId = $stateParams.explorerId;
 vm.componentId = $stateParams.componentId;
 vm.components = [];
 vm.componentsCopy;
 vm.componentsSrv = new ComponentsSrv();
 vm.componentFormDisplay = false;



 vm.defaultComponentData = {
  explorerId: $stateParams.explorerId,
  privacy: 0
 }
 vm.newComponentData = angular.copy(vm.defaultComponentData);

 vm.showComponentForm = function () {
  vm.componentFormDisplay = true;
 };

 vm.getComponents = function (explorerId, componentId) {
  vm.componentsSrv.getExplorerSubComponents(explorerId, componentId).then(function (response) {
   vm.components = response;
  });
 };

 vm.click = function () {
  angularGridInstance.components.refresh();
 }

 vm.createComponent = function (data) {
  vm.componentsSrv.createComponent(data).then(function (response) {
   vm.componentFormDisplay = false;
   vm.newComponentData = angular.copy(vm.defaultComponentData);
   vm.components.unshift(response);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editComponent = function (data) {
  vm.componentsSrv.editComponent(data).then(function (response) {
   vm.componentFormDisplay = false;
   vm.newComponentData = angular.copy(vm.defaultComponentData);
   vm.componentsCopy = angular.copy(vm.components);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editComponentSections = {
  details: function (componentId, detail) {
   var componentData = {
    componentId: componentId,
    title: detail.title,
    description: detail.description
   };
   vm.editComponent(componentData);
  }
 }

 vm.cancelComponent = function (form) {
  vm.componentFormDisplay = false;
  vm.newComponentData = angular.copy(vm.defaultComponentData)
  if (form) {
   form.$setPristine();
   form.$setUntouched();
  }
 };




 vm.editComponent = function (component) {
  vm.editedComponent = component;
  // Clone the original component to restore it on demand.
  vm.originalComponent = angular.copy(component);
 };


 vm.doneEditing = function (component) {
  vm.editedComponent = null;
  component.title = component.title.trim();

  if (!component.title) {
   vm.removeComponent(component);
  }
 };

 vm.openComponent = function (component) {
  var modalInstance = $uibModal.open({
   animation: true,
   templateUrl: 'component-modal.html',
   controller: 'ComponentCtrl as componentCtrl',
   backdrop: 'static',
   size: 'xl',
   resolve: {
    componentData: function () {
     return component;
    }
   }
  });

  modalInstance.result.then(function (selectedItem) {
   $scope.selected = selectedItem;
  }, function () {
   $log.info('Modal dismissed at: ' + new Date());
  });
 };



 //--------init------
 vm.getComponents(vm.explorerId, vm.componentId);
};


componentsCtrl.$inject = [
 'ComponentsSrv',
 'angularGridInstance',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$uibModal',
 '$log',
 '$filter'];

angular.module("app.explorer").controller('ComponentsCtrl', componentsCtrl);