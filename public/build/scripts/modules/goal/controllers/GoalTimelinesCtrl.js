var goalProgressCtrl=function(GoalProgressManager,$scope,$state,$stateParams,$http,$rootScope,$location,$uibModal,$log,$filter){var vm=this;vm.goalId=$stateParams.goalId,vm.goalProgressCopy,vm.goalProgressManager=new GoalProgressManager,vm.progressFormDisplay=!1,vm.defaultGoalProgressData={goalId:$stateParams.goalId,privacy:0},vm.newGoalProgressData=angular.copy(vm.defaultGoalProgressData),vm.showProgressForm=function(){vm.progressFormDisplay=!0},vm.createGoalProgress=function(data){vm.goalProgressManager.createGoalProgress(data).then(function(response){vm.progressFormDisplay=!1,vm.newGoalProgressData=angular.copy(vm.defaultGoalProgressData),vm.goalProgressCopy=angular.copy(vm.goalProgressManager.goalProgress)},function(response){console.log(response)})},vm.editGoalProgress=function(data){vm.goalProgressManager.editGoalProgress(data).then(function(response){vm.progressFormDisplay=!1,vm.newGoalProgressData=angular.copy(vm.defaultGoalProgressData),vm.goalProgressCopy=angular.copy(vm.goalProgressManager.goalProgress)},function(response){console.log(response)})},vm.editGoalProgressSections={details:function(goalProgressId,detail){var goalProgressData={goalProgressId:goalProgressId,title:detail.title,description:detail.description};vm.editGoalProgress(goalProgressData)}},vm.cancelGoalProgress=function(form){vm.progressFormDisplay=!1,vm.newGoalProgressData=angular.copy(vm.defaultGoalProgressData),form&&(form.$setPristine(),form.$setUntouched())},vm.revertGoalProgress=function(goalProgress,goalProgressCopy){goalProgress=goalProgressCopy},vm.editedProgress=null,$scope.$watch(angular.bind(this,function(){return vm.goalProgress}),function(){vm.doneCount=vm.goalProgressManager.goalProgress.length-vm.remainingCount,vm.allChecked=!vm.remainingCount},!0),vm.editProgress=function(goalProgress){vm.editedProgress=goalProgress,vm.originalProgress=angular.copy(goalProgress)},vm.doneEditing=function(goalProgress){vm.editedProgress=null,goalProgress.title=goalProgress.title.trim(),goalProgress.title||vm.removeProgress(goalProgress)},vm.openGoalProgress=function(goalProgress){var modalInstance=$uibModal.open({animation:!0,templateUrl:"goal-progress-modal.html",controller:"GoalProgressCtrl as goalProgressCtrl",backdrop:"static",size:"xl",resolve:{goalProgressData:function(){return goalProgress}}});modalInstance.result.then(function(selectedItem){$scope.selected=selectedItem},function(){$log.info("Modal dismissed at: "+new Date)})},vm.goalProgressManager.getGoalProgress(vm.goalId)};goalProgressCtrl.$inject=["GoalProgressManager","$scope","$state","$stateParams","$http","$rootScope","$location","$uibModal","$log","$filter"],angular.module("app.goal").controller("GoalProgressCtrl",goalProgressCtrl);