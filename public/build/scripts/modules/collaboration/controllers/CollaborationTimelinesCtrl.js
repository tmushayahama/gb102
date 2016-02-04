var collaborationTimelinesCtrl=function(CollaborationTimelinesManager,$scope,$state,$stateParams,$http,$rootScope,$location,$uibModal,$log,$filter){var vm=this;vm.collaborationId=$stateParams.collaborationId,vm.collaborationTimelinesCopy,vm.collaborationTimelinesManager=new CollaborationTimelinesManager,vm.timelineFormDisplay=!1,vm.defaultCollaborationTimelineData={collaborationId:$stateParams.collaborationId,privacy:0},vm.newCollaborationTimelineData=angular.copy(vm.defaultCollaborationTimelineData),vm.showTimelineForm=function(){vm.timelineFormDisplay=!0},vm.createCollaborationTimeline=function(data){vm.collaborationTimelinesManager.createCollaborationTimeline(data).then(function(response){vm.timelineFormDisplay=!1,vm.newCollaborationTimelineData=angular.copy(vm.defaultCollaborationTimelineData),vm.collaborationTimelinesCopy=angular.copy(vm.collaborationTimelinesManager.collaborationTimelines)},function(response){console.log(response)})},vm.editCollaborationTimeline=function(data){vm.collaborationTimelinesManager.editCollaborationTimeline(data).then(function(response){vm.timelineFormDisplay=!1,vm.newCollaborationTimelineData=angular.copy(vm.defaultCollaborationTimelineData),vm.collaborationTimelinesCopy=angular.copy(vm.collaborationTimelinesManager.collaborationTimelines)},function(response){console.log(response)})},vm.editCollaborationTimelineSections={details:function(collaborationTimelineId,detail){var collaborationTimelineData={collaborationTimelineId:collaborationTimelineId,title:detail.title,description:detail.description};vm.editCollaborationTimeline(collaborationTimelineData)}},vm.cancelCollaborationTimeline=function(form){vm.timelineFormDisplay=!1,vm.newCollaborationTimelineData=angular.copy(vm.defaultCollaborationTimelineData),form&&(form.$setPristine(),form.$setUntouched())},vm.revertCollaborationTimeline=function(collaborationTimeline,collaborationTimelineCopy){collaborationTimeline=collaborationTimelineCopy},vm.editedTimeline=null,$scope.$watch(angular.bind(this,function(){return vm.collaborationTimelines}),function(){vm.doneCount=vm.collaborationTimelinesManager.collaborationTimelines.length-vm.remainingCount,vm.allChecked=!vm.remainingCount},!0),vm.editTimeline=function(collaborationTimeline){vm.editedTimeline=collaborationTimeline,vm.originalTimeline=angular.copy(collaborationTimeline)},vm.doneEditing=function(collaborationTimeline){vm.editedTimeline=null,collaborationTimeline.title=collaborationTimeline.title.trim(),collaborationTimeline.title||vm.removeTimeline(collaborationTimeline)},vm.openCollaborationTimeline=function(collaborationTimeline){var modalInstance=$uibModal.open({animation:!0,templateUrl:"collaboration-timeline-modal.html",controller:"CollaborationTimelineCtrl as collaborationTimelineCtrl",backdrop:"static",size:"xl",resolve:{collaborationTimelineData:function(){return collaborationTimeline}}});modalInstance.result.then(function(selectedItem){$scope.selected=selectedItem},function(){$log.info("Modal dismissed at: "+new Date)})},vm.collaborationTimelinesManager.getCollaborationTimelines(vm.collaborationId)};collaborationTimelinesCtrl.$inject=["CollaborationTimelinesManager","$scope","$state","$stateParams","$http","$rootScope","$location","$uibModal","$log","$filter"],angular.module("app.collaboration").controller("CollaborationTimelinesCtrl",collaborationTimelinesCtrl);