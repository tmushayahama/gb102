var swipeProgressCtrl=function(SwipeProgressManager,$scope,$state,$stateParams,$http,$rootScope,$location,$uibModal,$log,$filter){var vm=this;vm.swipeId=$stateParams.swipeId,vm.swipeProgressCopy,vm.swipeProgressManager=new SwipeProgressManager,vm.progressFormDisplay=!1,vm.defaultSwipeProgressData={swipeId:$stateParams.swipeId,privacy:0},vm.newSwipeProgressData=angular.copy(vm.defaultSwipeProgressData),vm.showProgressForm=function(){vm.progressFormDisplay=!0},vm.createSwipeProgress=function(data){vm.swipeProgressManager.createSwipeProgress(data).then(function(response){vm.progressFormDisplay=!1,vm.newSwipeProgressData=angular.copy(vm.defaultSwipeProgressData),vm.swipeProgressCopy=angular.copy(vm.swipeProgressManager.swipeProgress)},function(response){console.log(response)})},vm.editSwipeProgress=function(data){vm.swipeProgressManager.editSwipeProgress(data).then(function(response){vm.progressFormDisplay=!1,vm.newSwipeProgressData=angular.copy(vm.defaultSwipeProgressData),vm.swipeProgressCopy=angular.copy(vm.swipeProgressManager.swipeProgress)},function(response){console.log(response)})},vm.editSwipeProgressSections={details:function(swipeProgressId,detail){var swipeProgressData={swipeProgressId:swipeProgressId,title:detail.title,description:detail.description};vm.editSwipeProgress(swipeProgressData)}},vm.cancelSwipeProgress=function(form){vm.progressFormDisplay=!1,vm.newSwipeProgressData=angular.copy(vm.defaultSwipeProgressData),form&&(form.$setPristine(),form.$setUntouched())},vm.revertSwipeProgress=function(swipeProgress,swipeProgressCopy){swipeProgress=swipeProgressCopy},vm.editedProgress=null,$scope.$watch(angular.bind(this,function(){return vm.swipeProgress}),function(){vm.doneCount=vm.swipeProgressManager.swipeProgress.length-vm.remainingCount,vm.allChecked=!vm.remainingCount},!0),vm.editProgress=function(swipeProgress){vm.editedProgress=swipeProgress,vm.originalProgress=angular.copy(swipeProgress)},vm.doneEditing=function(swipeProgress){vm.editedProgress=null,swipeProgress.title=swipeProgress.title.trim(),swipeProgress.title||vm.removeProgress(swipeProgress)},vm.openSwipeProgress=function(swipeProgress){var modalInstance=$uibModal.open({animation:!0,templateUrl:"swipe-progress-modal.html",controller:"SwipeProgressCtrl as swipeProgressCtrl",backdrop:"static",size:"xl",resolve:{swipeProgressData:function(){return swipeProgress}}});modalInstance.result.then(function(selectedItem){$scope.selected=selectedItem},function(){$log.info("Modal dismissed at: "+new Date)})},vm.swipeProgressManager.getSwipeProgress(vm.swipeId)};swipeProgressCtrl.$inject=["SwipeProgressManager","$scope","$state","$stateParams","$http","$rootScope","$location","$uibModal","$log","$filter"],angular.module("app.swipe").controller("SwipeProgressCtrl",swipeProgressCtrl);