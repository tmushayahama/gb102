var explorerComponentsCtrl = function (
        ExplorerComponentsSrv,
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
 vm.explorerComponentBuckets = [];
 vm.explorerComponentsCopy;
 vm.explorerComponentsSrv = new ExplorerComponentsSrv();
 vm.componentFormDisplay = false;



 vm.defaultExplorerComponentData = {
  explorerId: $stateParams.explorerId,
  privacy: 0
 }
 vm.newExplorerComponentData = angular.copy(vm.defaultExplorerComponentData);

 vm.showComponentForm = function () {
  vm.componentFormDisplay = true;
 };

 vm.getExplorerComponents = function (explorerId) {
  vm.explorerComponentsSrv.getExplorerComponents(explorerId).then(function (response) {
   vm.explorerComponentBuckets = response;
   angular.forEach(response, function (step, key) {
    vm.explorerComponentsSrv.getSubComponents(step.component.id).then(function (stepResponse) {
     vm.explorerComponentBuckets[key].explorerComponents = stepResponse;
     //angularGridInstance.components.refresh();
    });
   });
  });
 }

 vm.click = function () {
  angularGridInstance.components.refresh();
 }

 vm.createExplorerComponent = function (data) {
  vm.explorerComponentsSrv.createExplorerComponent(data).then(function (response) {
   vm.componentFormDisplay = false;
   vm.newExplorerComponentData = angular.copy(vm.defaultExplorerComponentData);
   vm.explorerComponents.unshift(response);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editExplorerComponent = function (data) {
  vm.explorerComponentsSrv.editExplorerComponent(data).then(function (response) {
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


 vm.editedComponent = null;

 $scope.$watch(angular.bind(this, function () {
  return vm.explorerComponents;
 }), function () {
  //vm.remainingCount = filterFilter(explorerComponents, {completed: false}).length;
  vm.doneCount = vm.explorerComponents.length - vm.remainingCount;
  vm.allChecked = !vm.remainingCount;
  //ExplorerComponentService.put(vm.explorerComponents);
 }, true);
 /*
  $scope.$watch(angular.bind(this, function () {
  return vm.location.path();
  }), function (path) {
  vm.statusFilter = (path === '/active') ?
  {completed: false} : (path === '/completed') ?
  {completed: true} : null;
  });
  */




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
 vm.getExplorerComponents(vm.explorerId);
};


explorerComponentsCtrl.$inject = [
 'ExplorerComponentsSrv',
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