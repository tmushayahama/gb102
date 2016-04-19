var explorerExercisesCtrl = function (
        ExplorerExercisesSrv,
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
 vm.explorerExercisesCopy;
 vm.explorerExercisesSrv = new ExplorerExercisesSrv();
 vm.exerciseFormDisplay = false;

 vm.defaultExplorerExerciseData = {
  explorerId: $stateParams.explorerId,
  privacy: 0
 }
 vm.newExplorerExerciseData = angular.copy(vm.defaultExplorerExerciseData);

 vm.showExerciseForm = function () {
  vm.exerciseFormDisplay = true;
 };

 vm.createExplorerExercise = function (data) {
  vm.explorerExercisesSrv.createExplorerExercise(data).then(function (response) {
   vm.exerciseFormDisplay = false;
   vm.newExplorerExerciseData = angular.copy(vm.defaultExplorerExerciseData);
   vm.explorerExercisesCopy = angular.copy(vm.explorerExercisesSrv.explorerExercises);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editExplorerExercise = function (data) {
  vm.explorerExercisesSrv.editExplorerExercise(data).then(function (response) {
   vm.exerciseFormDisplay = false;
   vm.newExplorerExerciseData = angular.copy(vm.defaultExplorerExerciseData);
   vm.explorerExercisesCopy = angular.copy(vm.explorerExercisesSrv.explorerExercises);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editExplorerExerciseSections = {
  details: function (explorerExerciseId, detail) {
   var explorerExerciseData = {
    explorerExerciseId: explorerExerciseId,
    title: detail.title,
    description: detail.description
   };
   vm.editExplorerExercise(explorerExerciseData);
  }
 }

 vm.cancelExplorerExercise = function (form) {
  vm.exerciseFormDisplay = false;
  vm.newExplorerExerciseData = angular.copy(vm.defaultExplorerExerciseData)
  if (form) {
   form.$setPristine();
   form.$setUntouched();
  }
 };

 vm.revertExplorerExercise = function (explorerExercise, explorerExerciseCopy) {
  explorerExercise = explorerExerciseCopy;
  /*
   $filter('filter')
   (vm.explorerExercisesSrv.explorerExercises, {id: explorerExerciseId}, true)[0]
   = angular.copy($filter('filter')
   (vm.explorerExercisesCopy, {id: explorerExerciseId}, true)[0]);
   if (explorerExercise.length && explorerExerciseCopy.length) {
   // vm.explorerExercisesSrv.explorerExercises angular.copy(vm.explorerExercisesCopy);
   }
   */
 };






 vm.editedExercise = null;

 $scope.$watch(angular.bind(this, function () {
  return vm.explorerExercises;
 }), function () {
  //vm.remainingCount = filterFilter(explorerExercises, {completed: false}).length;
  vm.doneCount = vm.explorerExercisesSrv.explorerExercises.length - vm.remainingCount;
  vm.allChecked = !vm.remainingCount;
  //ExplorerExerciseService.put(vm.explorerExercises);
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




 vm.editExercise = function (explorerExercise) {
  vm.editedExercise = explorerExercise;
  // Clone the original explorerExercise to restore it on demand.
  vm.originalExercise = angular.copy(explorerExercise);
 };


 vm.doneEditing = function (explorerExercise) {
  vm.editedExercise = null;
  explorerExercise.title = explorerExercise.title.trim();

  if (!explorerExercise.title) {
   vm.removeExercise(explorerExercise);
  }
 };

 vm.openExplorerExercise = function (explorerExercise) {
  var modalInstance = $uibModal.open({
   animation: true,
   templateUrl: 'explorer-exercise-modal.html',
   controller: 'ExplorerExerciseCtrl as explorerExerciseCtrl',
   backdrop: 'static',
   size: 'xl',
   resolve: {
    explorerExerciseData: function () {
     return explorerExercise;
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
 vm.explorerExercisesSrv.getExplorerExercises(vm.explorerId);
};


explorerExercisesCtrl.$inject = [
 'ExplorerExercisesSrv',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$uibModal',
 '$log',
 '$filter'];

angular.module("app.explorer").controller('ExplorerExercisesCtrl', explorerExercisesCtrl);
