var explorerObjectiveCtrl = function (
        ExplorerObjectivesSrv,
        $uibModalInstance,
        $scope,
        $state,
        $stateParams,
        $http,
        $rootScope,
        $location,
        $log,
        explorerObjectiveData) {
 var vm = this;
 vm.explorerId = explorerObjectiveData.explorer_id;
 vm.explorerObjectiveId = explorerObjectiveData.id;
 vm.explorerObjectivesSrv = new ExplorerObjectivesSrv();


 vm.objectiveId = explorerObjectiveData.objective_id;

 vm.objectiveFormDisplay = false;




 vm.ok = function () {
  $uibModalInstance.close();
 };

 vm.close = function () {
  $uibModalInstance.dismiss('cancel');
 };

 // vm.newExplorerObjectiveData = vm.defaultExplorerObjectiveData;

 vm.getExplorerObjective = function (explorerId, objectiveId) {
  vm.explorerObjectivesSrv.getExplorerObjective(explorerId, objectiveId).then(function (response) {
  }, function (error) {
   console.log(error);
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
  details: function () {
   var explorerObjectiveData = {
    explorerObjectiveId: vm.explorerObjectivesSrv.explorerObjective.objective.id,
    title: vm.explorerObjectivesSrv.explorerObjective.objective.title,
    description: vm.explorerObjectivesSrv.explorerObjective.objective.description
   };
   vm.editExplorerObjective(explorerObjectiveData);
  }
 };



 vm.showObjectiveForm = function () {
  vm.objectiveFormDisplay = true;
 };



 //--------init------
 vm.getExplorerObjective(vm.explorerId, vm.objectiveId);
};


explorerObjectiveCtrl.$inject = [
 'ExplorerObjectivesSrv',
 '$uibModalInstance',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$log',
 'explorerObjectiveData'];

angular.module("app.explorer").controller('ExplorerObjectiveCtrl', explorerObjectiveCtrl);
