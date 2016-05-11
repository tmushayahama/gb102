var explorerObjectivesCtrl = function (
        ExplorerObjectivesSrv,
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
 vm.explorerObjectivesCopy;
 vm.explorerObjectivesSrv = new ExplorerObjectivesSrv();
 vm.objectiveFormDisplay = false;

 vm.defaultExplorerObjectiveData = {
  explorerId: $stateParams.explorerId,
  privacy: 0
 }
 vm.newExplorerObjectiveData = angular.copy(vm.defaultExplorerObjectiveData);

 vm.showObjectiveForm = function () {
  vm.objectiveFormDisplay = true;
 };

 vm.createExplorerObjective = function (data) {
  vm.explorerObjectivesSrv.createExplorerObjective(data).then(function (response) {
   vm.objectiveFormDisplay = false;
   vm.newExplorerObjectiveData = angular.copy(vm.defaultExplorerObjectiveData);
   // vm.explorerObjectivesCopy = angular.copy(vm.explorerObjectivesSrv.explorerObjectives);
   // vm.explorerObjectivesSrv.explorerObjectives


  }, function (response) {
   console.log(response);
  });
 };

 vm.editExplorerObjective = function (data) {
  vm.explorerObjectivesSrv.editExplorerObjective(data).then(function (response) {
   vm.editDecriptionMode = false;
  }, function (response) {
   console.log(response);
  });
 };

 vm.editExplorerObjectiveSections = {
  details: function (explorerObjective) {
   var explorerObjectiveData = {
    explorerObjectiveId: explorerObjective.objective.id,
    title: explorerObjective.objective.title,
    description: explorerObjective.objective.description
   };
   vm.editExplorerObjective(explorerObjectiveData);
  }
 };

 vm.cancelExplorerObjective = function (form) {
  vm.objectiveFormDisplay = false;
  vm.newExplorerObjectiveData = angular.copy(vm.defaultExplorerObjectiveData)
  if (form) {
   form.$setPristine();
   form.$setUntouched();
  }
 };

 vm.revertExplorerObjective = function (explorerObjective, explorerObjectiveCopy) {
  explorerObjective = explorerObjectiveCopy;
 };

 vm.editedObjective = null;

 $scope.$watch(angular.bind(this, function () {
  return vm.explorerObjectives;
 }), function () {
  //vm.remainingCount = filterFilter(explorerObjectives, {completed: false}).length;
  vm.doneCount = vm.explorerObjectivesSrv.explorerObjectives.length - vm.remainingCount;
  vm.allChecked = !vm.remainingCount;
  //ExplorerObjectiveService.put(vm.explorerObjectives);
 }, true);

 vm.editObjective = function (explorerObjective) {
  vm.editedObjective = explorerObjective;
  // Clone the original explorerObjective to restore it on demand.
  vm.originalObjective = angular.copy(explorerObjective);
 };


 vm.doneEditing = function (explorerObjective) {
  vm.editedObjective = null;
  explorerObjective.title = explorerObjective.title.trim();

  if (!explorerObjective.title) {
   vm.removeObjective(explorerObjective);
  }
 };

 vm.openExplorerObjective = function (explorerObjective) {
  var modalInstance = $uibModal.open({
   animation: true,
   templateUrl: 'explorer-objective-modal.html',
   controller: 'ExplorerObjectiveCtrl as explorerObjectiveCtrl',
   backdrop: 'static',
   size: 'xl',
   resolve: {
    explorerObjectiveData: function () {
     return explorerObjective;
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
 vm.explorerObjectivesSrv.getExplorerObjectives(vm.explorerId);
};


explorerObjectivesCtrl.$inject = [
 'ExplorerObjectivesSrv',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$uibModal',
 '$log',
 '$filter'];

angular.module("app.explorer").controller('ExplorerObjectivesCtrl', explorerObjectivesCtrl);
