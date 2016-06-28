var teachProgressCtrl=function(TeachProgressSrv,$scope,$state,$stateParams,$http,$rootScope,$location,$uibModal,$log,$filter){var vm=this;vm.teachId=$stateParams.teachId,vm.teachProgressCopy,vm.teachProgressSrv=new TeachProgressSrv,vm.progressFormDisplay=!1,vm.defaultTeachProgressData={teachId:$stateParams.teachId,privacy:0},vm.newTeachProgressData=angular.copy(vm.defaultTeachProgressData),vm.showProgressForm=function(){vm.progressFormDisplay=!0},vm.createTeachProgress=function(data){vm.teachProgressSrv.createTeachProgress(data).then(function(response){vm.progressFormDisplay=!1,vm.newTeachProgressData=angular.copy(vm.defaultTeachProgressData),vm.teachProgressCopy=angular.copy(vm.teachProgressSrv.teachProgress)},function(response){console.log(response)})},vm.editTeachProgress=function(data){vm.teachProgressSrv.editTeachProgress(data).then(function(response){vm.progressFormDisplay=!1,vm.newTeachProgressData=angular.copy(vm.defaultTeachProgressData),vm.teachProgressCopy=angular.copy(vm.teachProgressSrv.teachProgress)},function(response){console.log(response)})},vm.editTeachProgressSections={details:function(teachProgressId,detail){({teachProgressId:teachProgressId,title:detail.title,description:detail.description});vm.editTeachTimeline(teachTimelineData)}},vm.cancelTeachTimeline=function(form){vm.progressFormDisplay=!1,vm.newTeachTimelineData=angular.copy(vm.defaultTeachTimelineData),form&&(form.$setPristine(),form.$setUntouched())},vm.revertTeachTimeline=function(teachTimeline,teachTimelineCopy){teachTimeline=teachTimelineCopy},vm.editedTimeline=null,$scope.$watch(angular.bind(this,function(){return vm.teachTimelines}),function(){vm.doneCount=vm.teachTimelinesSrv.teachTimelines.length-vm.remainingCount,vm.allChecked=!vm.remainingCount},!0),vm.editTimeline=function(teachTimeline){vm.editedTimeline=teachTimeline,vm.originalTimeline=angular.copy(teachTimeline)},vm.doneEditing=function(teachTimeline){vm.editedTimeline=null,teachTimeline.title=teachTimeline.title.trim(),teachTimeline.title||vm.removeTimeline(teachTimeline)},vm.openTeachTimeline=function(teachTimeline){var modalInstance=$uibModal.open({animation:!0,templateUrl:"teach-progress-modal.html",controller:"TeachTimelineCtrl as teachTimelineCtrl",backdrop:"static",size:"xl",resolve:{teachTimelineData:function(){return teachTimeline}}});modalInstance.result.then(function(selectedItem){$scope.selected=selectedItem},function(){$log.info("Modal dismissed at: "+new Date)})},vm.teachTimelinesSrv.getTeachTimelines(vm.teachId)};teachTimelinesCtrl.$inject=["TeachTimelinesSrv","$scope","$state","$stateParams","$http","$rootScope","$location","$uibModal","$log","$filter"],angular.module("app.teach").controller("TeachTimelinesCtrl",teachTimelinesCtrl);