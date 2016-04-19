var explorerExercisesCtrl=function(ExplorerExercisesSrv,$scope,$state,$stateParams,$http,$rootScope,$location,$uibModal,$log,$filter){var vm=this;vm.explorerId=$stateParams.explorerId,vm.explorerExercisesCopy,vm.explorerExercisesSrv=new ExplorerExercisesSrv,vm.exerciseFormDisplay=!1,vm.defaultExplorerExerciseData={explorerId:$stateParams.explorerId,privacy:0},vm.newExplorerExerciseData=angular.copy(vm.defaultExplorerExerciseData),vm.showExerciseForm=function(){vm.exerciseFormDisplay=!0},vm.createExplorerExercise=function(data){vm.explorerExercisesSrv.createExplorerExercise(data).then(function(response){vm.exerciseFormDisplay=!1,vm.newExplorerExerciseData=angular.copy(vm.defaultExplorerExerciseData),vm.explorerExercisesCopy=angular.copy(vm.explorerExercisesSrv.explorerExercises)},function(response){console.log(response)})},vm.editExplorerExercise=function(data){vm.explorerExercisesSrv.editExplorerExercise(data).then(function(response){vm.exerciseFormDisplay=!1,vm.newExplorerExerciseData=angular.copy(vm.defaultExplorerExerciseData),vm.explorerExercisesCopy=angular.copy(vm.explorerExercisesSrv.explorerExercises)},function(response){console.log(response)})},vm.editExplorerExerciseSections={details:function(explorerExerciseId,detail){var explorerExerciseData={explorerExerciseId:explorerExerciseId,title:detail.title,description:detail.description};vm.editExplorerExercise(explorerExerciseData)}},vm.cancelExplorerExercise=function(form){vm.exerciseFormDisplay=!1,vm.newExplorerExerciseData=angular.copy(vm.defaultExplorerExerciseData),form&&(form.$setPristine(),form.$setUntouched())},vm.revertExplorerExercise=function(explorerExercise,explorerExerciseCopy){explorerExercise=explorerExerciseCopy},vm.editedExercise=null,$scope.$watch(angular.bind(this,function(){return vm.explorerExercises}),function(){vm.doneCount=vm.explorerExercisesSrv.explorerExercises.length-vm.remainingCount,vm.allChecked=!vm.remainingCount},!0),vm.editExercise=function(explorerExercise){vm.editedExercise=explorerExercise,vm.originalExercise=angular.copy(explorerExercise)},vm.doneEditing=function(explorerExercise){vm.editedExercise=null,explorerExercise.title=explorerExercise.title.trim(),explorerExercise.title||vm.removeExercise(explorerExercise)},vm.openExplorerExercise=function(explorerExercise){var modalInstance=$uibModal.open({animation:!0,templateUrl:"explorer-exercise-modal.html",controller:"ExplorerExerciseCtrl as explorerExerciseCtrl",backdrop:"static",size:"xl",resolve:{explorerExerciseData:function(){return explorerExercise}}});modalInstance.result.then(function(selectedItem){$scope.selected=selectedItem},function(){$log.info("Modal dismissed at: "+new Date)})},vm.explorerExercisesSrv.getExplorerExercises(vm.explorerId)};explorerExercisesCtrl.$inject=["ExplorerExercisesSrv","$scope","$state","$stateParams","$http","$rootScope","$location","$uibModal","$log","$filter"],angular.module("app.explorer").controller("ExplorerExercisesCtrl",explorerExercisesCtrl);