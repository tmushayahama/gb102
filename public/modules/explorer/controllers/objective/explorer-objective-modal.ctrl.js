var explorerObjectiveCtrl = function (
        ExplorerObjectiveSrv,
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
 vm.explorerObjectiveSrv = new ExplorerObjectiveSrv();


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
  vm.explorerObjectiveSrv.getExplorerObjective(explorerId, objectiveId).then(function (response) {
  }, function (error) {
   console.log(error);
  });
 };

 vm.editExplorerObjective = function (data) {
  vm.explorerObjectiveSrv.editExplorerObjective(data).then(function (response) {
   vm.editDecriptionMode = false;
  }, function (response) {
   console.log(response);
  });
 };

 vm.editExplorerObjectiveSections = {
  details: function () {
   var explorerObjectiveData = {
    explorerObjectiveId: vm.explorerObjectiveSrv.explorerObjective.objective.id,
    title: vm.explorerObjectiveSrv.explorerObjective.objective.title,
    description: vm.explorerObjectiveSrv.explorerObjective.objective.description
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
 'ExplorerObjectiveSrv',
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
