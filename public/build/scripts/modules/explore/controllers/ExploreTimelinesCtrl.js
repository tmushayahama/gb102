var exploreTimelinesCtrl=function(ExploreTimelinesManager,$scope,$state,$stateParams,$http,$rootScope,$location,$uibModal,$log,$filter){var vm=this;vm.exploreId=$stateParams.exploreId,vm.exploreTimelinesCopy,vm.exploreTimelinesManager=new ExploreTimelinesManager,vm.timelineFormDisplay=!1,vm.defaultExploreTimelineData={exploreId:$stateParams.exploreId,privacy:0},vm.newExploreTimelineData=angular.copy(vm.defaultExploreTimelineData),vm.showTimelineForm=function(){vm.timelineFormDisplay=!0},vm.createExploreTimeline=function(data){vm.exploreTimelinesManager.createExploreTimeline(data).then(function(response){vm.timelineFormDisplay=!1,vm.newExploreTimelineData=angular.copy(vm.defaultExploreTimelineData),vm.exploreTimelinesCopy=angular.copy(vm.exploreTimelinesManager.exploreTimelines)},function(response){console.log(response)})},vm.editExploreTimeline=function(data){vm.exploreTimelinesManager.editExploreTimeline(data).then(function(response){vm.timelineFormDisplay=!1,vm.newExploreTimelineData=angular.copy(vm.defaultExploreTimelineData),vm.exploreTimelinesCopy=angular.copy(vm.exploreTimelinesManager.exploreTimelines)},function(response){console.log(response)})},vm.editExploreTimelineSections={details:function(exploreTimelineId,detail){var exploreTimelineData={exploreTimelineId:exploreTimelineId,title:detail.title,description:detail.description};vm.editExploreTimeline(exploreTimelineData)}},vm.cancelExploreTimeline=function(form){vm.timelineFormDisplay=!1,vm.newExploreTimelineData=angular.copy(vm.defaultExploreTimelineData),form&&(form.$setPristine(),form.$setUntouched())},vm.revertExploreTimeline=function(exploreTimeline,exploreTimelineCopy){exploreTimeline=exploreTimelineCopy},vm.editedTimeline=null,$scope.$watch(angular.bind(this,function(){return vm.exploreTimelines}),function(){vm.doneCount=vm.exploreTimelinesManager.exploreTimelines.length-vm.remainingCount,vm.allChecked=!vm.remainingCount},!0),vm.editTimeline=function(exploreTimeline){vm.editedTimeline=exploreTimeline,vm.originalTimeline=angular.copy(exploreTimeline)},vm.doneEditing=function(exploreTimeline){vm.editedTimeline=null,exploreTimeline.title=exploreTimeline.title.trim(),exploreTimeline.title||vm.removeTimeline(exploreTimeline)},vm.openExploreTimeline=function(exploreTimeline){var modalInstance=$uibModal.open({animation:!0,templateUrl:"explore-timeline-modal.html",controller:"ExploreTimelineCtrl as exploreTimelineCtrl",backdrop:"static",size:"xl",resolve:{exploreTimelineData:function(){return exploreTimeline}}});modalInstance.result.then(function(selectedItem){$scope.selected=selectedItem},function(){$log.info("Modal dismissed at: "+new Date)})},vm.exploreTimelinesManager.getExploreTimelines(vm.exploreId)};exploreTimelinesCtrl.$inject=["ExploreTimelinesManager","$scope","$state","$stateParams","$http","$rootScope","$location","$uibModal","$log","$filter"],angular.module("app.explore").controller("ExploreTimelinesCtrl",exploreTimelinesCtrl);