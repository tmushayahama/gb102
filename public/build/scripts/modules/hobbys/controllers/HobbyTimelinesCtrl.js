var hobbyTimelinesCtrl=function(HobbyTimelinesManager,$scope,$state,$stateParams,$http,$rootScope,$location,$uibModal,$log,$filter){var vm=this;vm.hobbyId=$stateParams.hobbyId,vm.hobbyTimelinesCopy,vm.hobbyTimelinesManager=new HobbyTimelinesManager,vm.timelineFormDisplay=!1,vm.defaultHobbyTimelineData={hobbyId:$stateParams.hobbyId,privacy:0},vm.newHobbyTimelineData=angular.copy(vm.defaultHobbyTimelineData),vm.showTimelineForm=function(){vm.timelineFormDisplay=!0},vm.createHobbyTimeline=function(data){vm.hobbyTimelinesManager.createHobbyTimeline(data).then(function(response){vm.timelineFormDisplay=!1,vm.newHobbyTimelineData=angular.copy(vm.defaultHobbyTimelineData),vm.hobbyTimelinesCopy=angular.copy(vm.hobbyTimelinesManager.hobbyTimelines)},function(response){console.log(response)})},vm.editHobbyTimeline=function(data){vm.hobbyTimelinesManager.editHobbyTimeline(data).then(function(response){vm.timelineFormDisplay=!1,vm.newHobbyTimelineData=angular.copy(vm.defaultHobbyTimelineData),vm.hobbyTimelinesCopy=angular.copy(vm.hobbyTimelinesManager.hobbyTimelines)},function(response){console.log(response)})},vm.editHobbyTimelineSections={details:function(hobbyTimelineId,detail){var hobbyTimelineData={hobbyTimelineId:hobbyTimelineId,title:detail.title,description:detail.description};vm.editHobbyTimeline(hobbyTimelineData)}},vm.cancelHobbyTimeline=function(form){vm.timelineFormDisplay=!1,vm.newHobbyTimelineData=angular.copy(vm.defaultHobbyTimelineData),form&&(form.$setPristine(),form.$setUntouched())},vm.revertHobbyTimeline=function(hobbyTimeline,hobbyTimelineCopy){hobbyTimeline=hobbyTimelineCopy},vm.editedTimeline=null,$scope.$watch(angular.bind(this,function(){return vm.hobbyTimelines}),function(){vm.doneCount=vm.hobbyTimelinesManager.hobbyTimelines.length-vm.remainingCount,vm.allChecked=!vm.remainingCount},!0),vm.editTimeline=function(hobbyTimeline){vm.editedTimeline=hobbyTimeline,vm.originalTimeline=angular.copy(hobbyTimeline)},vm.doneEditing=function(hobbyTimeline){vm.editedTimeline=null,hobbyTimeline.title=hobbyTimeline.title.trim(),hobbyTimeline.title||vm.removeTimeline(hobbyTimeline)},vm.openHobbyTimeline=function(hobbyTimeline){var modalInstance=$uibModal.open({animation:!0,templateUrl:"hobby-timeline-modal.html",controller:"HobbyTimelineCtrl as hobbyTimelineCtrl",backdrop:"static",size:"xl",resolve:{hobbyTimelineData:function(){return hobbyTimeline}}});modalInstance.result.then(function(selectedItem){$scope.selected=selectedItem},function(){$log.info("Modal dismissed at: "+new Date)})},vm.hobbyTimelinesManager.getHobbyTimelines(vm.hobbyId)};hobbyTimelinesCtrl.$inject=["HobbyTimelinesManager","$scope","$state","$stateParams","$http","$rootScope","$location","$uibModal","$log","$filter"],angular.module("app.hobbys").controller("HobbyTimelinesCtrl",hobbyTimelinesCtrl);