var explorerComponentsCtrl = function (
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
 vm.explorerComponents = [];
 vm.explorerComponentsCopy;
 vm.componentsSrv = new ComponentsSrv();
 vm.componentFormDisplay = false;



 vm.defaultExplorerComponentData = {
  explorerId: $stateParams.explorerId,
  privacy: 0
 }
 vm.newExplorerComponentData = angular.copy(vm.defaultExplorerComponentData);

 vm.showComponentForm = function () {
  vm.componentFormDisplay = true;
 };

 vm.getExplorerComponents = function (explorerId, componentId) {
  vm.componentsSrv.getExplorerSubComponents(explorerId, componentId).then(function (response) {
   vm.explorerComponents = response;
  });
 };

 vm.click = function () {
  angularGridInstance.components.refresh();
 }

 vm.createExplorerComponent = function (data) {
  vm.componentsSrv.createExplorerComponent(data).then(function (response) {
   vm.componentFormDisplay = false;
   vm.newExplorerComponentData = angular.copy(vm.defaultExplorerComponentData);
   vm.explorerComponents.unshift(response);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editExplorerComponent = function (data) {
  vm.componentsSrv.editExplorerComponent(data).then(function (response) {
   vm.componentFormDisplay = false;
   vm.newExplorerComponentData = angular.copy(vm.defaultExplorerComponentData);
   vm.explorerComponentsCopy = angular.copy(vm.explorerComponents);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editExplorerComponentSections = {
  details: function (explorerComponentId, detail) {
   var explorerComponentData = {
    explorerComponentId: explorerComponentId,
    title: detail.title,
    description: detail.description
   };
   vm.editExplorerComponent(explorerComponentData);
  }
 }

 vm.cancelExplorerComponent = function (form) {
  vm.componentFormDisplay = false;
  vm.newExplorerComponentData = angular.copy(vm.defaultExplorerComponentData)
  if (form) {
   form.$setPristine();
   form.$setUntouched();
  }
 };




 vm.editComponent = function (explorerComponent) {
  vm.editedComponent = explorerComponent;
  // Clone the original explorerComponent to restore it on demand.
  vm.originalComponent = angular.copy(explorerComponent);
 };


 vm.doneEditing = function (explorerComponent) {
  vm.editedComponent = null;
  explorerComponent.title = explorerComponent.title.trim();

  if (!explorerComponent.title) {
   vm.removeComponent(explorerComponent);
  }
 };

 vm.openExplorerComponent = function (explorerComponent) {
  var modalInstance = $uibModal.open({
   animation: true,
   templateUrl: 'explorer-component-modal.html',
   controller: 'ExplorerComponentCtrl as explorerComponentCtrl',
   backdrop: 'static',
   size: 'xl',
   resolve: {
    explorerComponentData: function () {
     return explorerComponent;
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
 vm.getExplorerComponents(vm.explorerId, vm.componentId);
};


explorerComponentsCtrl.$inject = [
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

angular.module("app.explorer").controller('ExplorerComponentsCtrl', explorerComponentsCtrl);
