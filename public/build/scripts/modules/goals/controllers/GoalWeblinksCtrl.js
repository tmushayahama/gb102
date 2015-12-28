var goalWeblinksCtrl=function(GoalWeblinksManager,$scope,$state,$stateParams,$http,$rootScope,$location,$uibModal,$log,$filter){var vm=this;vm.goalId=$stateParams.goalId,vm.goalWeblinksCopy,vm.goalWeblinksManager=new GoalWeblinksManager,vm.weblinkFormDisplay=!1,vm.defaultGoalWeblinkData={goalId:$stateParams.goalId,privacy:0},vm.newGoalWeblinkData=angular.copy(vm.defaultGoalWeblinkData),vm.showWeblinkForm=function(){vm.weblinkFormDisplay=!0},vm.createGoalWeblink=function(data){vm.goalWeblinksManager.createGoalWeblink(data).then(function(response){vm.weblinkFormDisplay=!1,vm.newGoalWeblinkData=angular.copy(vm.defaultGoalWeblinkData),vm.goalWeblinksCopy=angular.copy(vm.goalWeblinksManager.goalWeblinks)},function(response){console.log(response)})},vm.editGoalWeblink=function(data){vm.goalWeblinksManager.editGoalWeblink(data).then(function(response){vm.weblinkFormDisplay=!1,vm.newGoalWeblinkData=angular.copy(vm.defaultGoalWeblinkData),vm.goalWeblinksCopy=angular.copy(vm.goalWeblinksManager.goalWeblinks)},function(response){console.log(response)})},vm.editGoalWeblinkSections={details:function(goalWeblinkId,detail){var goalWeblinkData={goalWeblinkId:goalWeblinkId,title:detail.title,description:detail.description};vm.editGoalWeblink(goalWeblinkData)}},vm.cancelGoalWeblink=function(form){vm.weblinkFormDisplay=!1,vm.newGoalWeblinkData=angular.copy(vm.defaultGoalWeblinkData),form&&(form.$setPristine(),form.$setUntouched())},vm.revertGoalWeblink=function(goalWeblink,goalWeblinkCopy){goalWeblink=goalWeblinkCopy},vm.editedWeblink=null,$scope.$watch(angular.bind(this,function(){return vm.goalWeblinks}),function(){vm.doneCount=vm.goalWeblinksManager.goalWeblinks.length-vm.remainingCount,vm.allChecked=!vm.remainingCount},!0),vm.editWeblink=function(goalWeblink){vm.editedWeblink=goalWeblink,vm.originalWeblink=angular.copy(goalWeblink)},vm.doneEditing=function(goalWeblink){vm.editedWeblink=null,goalWeblink.title=goalWeblink.title.trim(),goalWeblink.title||vm.removeWeblink(goalWeblink)},vm.openGoalWeblink=function(goalWeblink){var modalInstance=$uibModal.open({animation:!0,templateUrl:"goal-weblink-modal.html",controller:"GoalWeblinkCtrl as goalWeblinkCtrl",backdrop:"static",size:"xl",resolve:{goalWeblinkData:function(){return goalWeblink}}});modalInstance.result.then(function(selectedItem){$scope.selected=selectedItem},function(){$log.info("Modal dismissed at: "+new Date)})},vm.goalWeblinksManager.getGoalWeblinks(vm.goalId)};goalWeblinksCtrl.$inject=["GoalWeblinksManager","$scope","$state","$stateParams","$http","$rootScope","$location","$uibModal","$log","$filter"],angular.module("app.goals").controller("GoalWeblinksCtrl",goalWeblinksCtrl);