var swipeCommentsCtrl=function(SwipeCommentsManager,$scope,$state,$stateParams,$http,$rootScope,$location,$uibModal,$log,$filter){var vm=this;vm.swipeId=$stateParams.swipeId,vm.swipeCommentsCopy,vm.swipeCommentsManager=new SwipeCommentsManager,vm.commentFormDisplay=!1,vm.defaultSwipeCommentData={swipeId:$stateParams.swipeId,privacy:0},vm.newSwipeCommentData=angular.copy(vm.defaultSwipeCommentData),vm.showCommentForm=function(){vm.commentFormDisplay=!0},vm.createSwipeComment=function(data){vm.swipeCommentsManager.createSwipeComment(data).then(function(response){vm.commentFormDisplay=!1,vm.newSwipeCommentData=angular.copy(vm.defaultSwipeCommentData),vm.swipeCommentsCopy=angular.copy(vm.swipeCommentsManager.swipeComments)},function(response){console.log(response)})},vm.editSwipeComment=function(data){vm.swipeCommentsManager.editSwipeComment(data).then(function(response){vm.commentFormDisplay=!1,vm.newSwipeCommentData=angular.copy(vm.defaultSwipeCommentData),vm.swipeCommentsCopy=angular.copy(vm.swipeCommentsManager.swipeComments)},function(response){console.log(response)})},vm.editSwipeCommentSections={details:function(swipeCommentId,detail){var swipeCommentData={swipeCommentId:swipeCommentId,title:detail.title,description:detail.description};vm.editSwipeComment(swipeCommentData)}},vm.cancelSwipeComment=function(form){vm.commentFormDisplay=!1,vm.newSwipeCommentData=angular.copy(vm.defaultSwipeCommentData),form&&(form.$setPristine(),form.$setUntouched())},vm.revertSwipeComment=function(swipeComment,swipeCommentCopy){swipeComment=swipeCommentCopy},vm.editedComment=null,$scope.$watch(angular.bind(this,function(){return vm.swipeComments}),function(){vm.doneCount=vm.swipeCommentsManager.swipeComments.length-vm.remainingCount,vm.allChecked=!vm.remainingCount},!0),vm.editComment=function(swipeComment){vm.editedComment=swipeComment,vm.originalComment=angular.copy(swipeComment)},vm.doneEditing=function(swipeComment){vm.editedComment=null,swipeComment.title=swipeComment.title.trim(),swipeComment.title||vm.removeComment(swipeComment)},vm.openSwipeComment=function(swipeComment){var modalInstance=$uibModal.open({animation:!0,templateUrl:"swipe-comment-modal.html",controller:"SwipeCommentCtrl as swipeCommentCtrl",backdrop:"static",size:"xl",resolve:{swipeCommentData:function(){return swipeComment}}});modalInstance.result.then(function(selectedItem){$scope.selected=selectedItem},function(){$log.info("Modal dismissed at: "+new Date)})},vm.swipeCommentsManager.getSwipeComments(vm.swipeId)};swipeCommentsCtrl.$inject=["SwipeCommentsManager","$scope","$state","$stateParams","$http","$rootScope","$location","$uibModal","$log","$filter"],angular.module("app.swipes").controller("SwipeCommentsCtrl",swipeCommentsCtrl);