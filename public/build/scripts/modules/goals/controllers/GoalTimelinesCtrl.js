var goalTimelinesCtrl=function(GoalTimelinesManager,$scope,$state,$stateParams,$http,$rootScope,$location,$uibModal,$log,$filter){var vm=this;vm.goalId=$stateParams.goalId,vm.goalTimelinesCopy,vm.goalTimelinesManager=new GoalTimelinesManager,vm.timelineFormDisplay=!1,vm.defaultGoalTimelineData={goalId:$stateParams.goalId,privacy:0},vm.newGoalTimelineData=angular.copy(vm.defaultGoalTimelineData),vm.showTimelineForm=function(){vm.timelineFormDisplay=!0},vm.createGoalTimeline=function(data){vm.goalTimelinesManager.createGoalTimeline(data).then(function(response){vm.timelineFormDisplay=!1,vm.newGoalTimelineData=angular.copy(vm.defaultGoalTimelineData),vm.goalTimelinesCopy=angular.copy(vm.goalTimelinesManager.goalTimelines)},function(response){console.log(response)})},vm.editGoalTimeline=function(data){vm.goalTimelinesManager.editGoalTimeline(data).then(function(response){vm.timelineFormDisplay=!1,vm.newGoalTimelineData=angular.copy(vm.defaultGoalTimelineData),vm.goalTimelinesCopy=angular.copy(vm.goalTimelinesManager.goalTimelines)},function(response){console.log(response)})},vm.editGoalTimelineSections={details:function(goalTimelineId,detail){var goalTimelineData={goalTimelineId:goalTimelineId,title:detail.title,description:detail.description};vm.editGoalTimeline(goalTimelineData)}},vm.cancelGoalTimeline=function(form){vm.timelineFormDisplay=!1,vm.newGoalTimelineData=angular.copy(vm.defaultGoalTimelineData),form&&(form.$setPristine(),form.$setUntouched())},vm.revertGoalTimeline=function(goalTimeline,goalTimelineCopy){goalTimeline=goalTimelineCopy},vm.editedTimeline=null,$scope.$watch(angular.bind(this,function(){return vm.goalTimelines}),function(){vm.doneCount=vm.goalTimelinesManager.goalTimelines.length-vm.remainingCount,vm.allChecked=!vm.remainingCount},!0),vm.editTimeline=function(goalTimeline){vm.editedTimeline=goalTimeline,vm.originalTimeline=angular.copy(goalTimeline)},vm.doneEditing=function(goalTimeline){vm.editedTimeline=null,goalTimeline.title=goalTimeline.title.trim(),goalTimeline.title||vm.removeTimeline(goalTimeline)},vm.openGoalTimeline=function(goalTimeline){var modalInstance=$uibModal.open({animation:!0,templateUrl:"goal-timeline-modal.html",controller:"GoalTimelineCtrl as goalTimelineCtrl",backdrop:"static",size:"xl",resolve:{goalTimelineData:function(){return goalTimeline}}});modalInstance.result.then(function(selectedItem){$scope.selected=selectedItem},function(){$log.info("Modal dismissed at: "+new Date)})},vm.goalTimelinesManager.getGoalTimelines(vm.goalId)};goalTimelinesCtrl.$inject=["GoalTimelinesManager","$scope","$state","$stateParams","$http","$rootScope","$location","$uibModal","$log","$filter"],angular.module("app.goals").controller("GoalTimelinesCtrl",goalTimelinesCtrl);