var explorerExerciseCtrl = function (
        ExplorerExercisesSrv,
        $uibModalInstance,
        $scope,
        $state,
        $stateParams,
        $http,
        $rootScope,
        $location,
        $log,
        explorerExerciseData) {
 var vm = this;
 vm.explorerId = explorerExerciseData.explorer_id;
 vm.explorerExerciseId = explorerExerciseData.id;
 vm.explorerExercisesSrv = new ExplorerExercisesSrv();


 vm.exerciseId = explorerExerciseData.exercise_id;

 vm.exerciseFormDisplay = false;




 vm.ok = function () {
  $uibModalInstance.close();
 };

 vm.close = function () {
  $uibModalInstance.dismiss('cancel');
 };

 // vm.newExplorerExerciseData = vm.defaultExplorerExerciseData;

 vm.getExplorerExercise = function (explorerId, exerciseId) {
  vm.explorerExercisesSrv.getExplorerExercise(explorerId, exerciseId).then(function (response) {
  }, function (error) {
   console.log(error);
  });
 };

 vm.editExplorerExercise = function (data) {
  vm.explorerExercisesSrv.editExplorerExercise(data).then(function (response) {
  }, function (response) {
   console.log(response);
  });
 };

 vm.editExplorerExerciseSections = {
  details: function (details) {
   var explorerExerciseData = {
    explorerExerciseId: vm.explorerExerciseId,
    title: details.title,
    description: details.description
   };
   vm.editExplorerExercise(explorerExerciseData);
  }
 };



 vm.showExerciseForm = function () {
  vm.exerciseFormDisplay = true;
 };



 //--------init------
 vm.getExplorerExercise(vm.explorerId, vm.exerciseId);
};


explorerExerciseCtrl.$inject = [
 'ExplorerExercisesSrv',
 '$uibModalInstance',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$log',
 'explorerExerciseData'];

angular.module("app.explorer").controller('ExplorerExerciseCtrl', explorerExerciseCtrl);
