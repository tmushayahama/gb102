var swipeCommentCtrl=function(SwipeCommentManager,$uibModalInstance,$scope,$state,$stateParams,$http,$rootScope,$location,$log,swipeCommentData){var vm=this;vm.swipeId=swipeCommentData.swipe_id,vm.swipeCommentId=swipeCommentData.id,vm.swipeCommentManager=new SwipeCommentManager,vm.commentId=swipeCommentData.comment_id,vm.commentFormDisplay=!1,vm.ok=function(){$uibModalInstance.close()},vm.close=function(){$uibModalInstance.dismiss("cancel")},vm.getSwipeComment=function(swipeId,commentId){vm.swipeCommentManager.getSwipeComment(swipeId,commentId).then(function(response){},function(error){console.log(error)})},vm.editSwipeComment=function(data){vm.swipeCommentManager.editSwipeComment(data).then(function(response){},function(response){console.log(response)})},vm.editSwipeCommentSections={details:function(details){var swipeCommentData={swipeCommentId:vm.swipeCommentId,title:details.title,description:details.description};vm.editSwipeComment(swipeCommentData)}},vm.showCommentForm=function(){vm.commentFormDisplay=!0},vm.getSwipeComment(vm.swipeId,vm.commentId)};swipeCommentCtrl.$inject=["SwipeCommentManager","$uibModalInstance","$scope","$state","$stateParams","$http","$rootScope","$location","$log","swipeCommentData"],angular.module("app.swipe").controller("SwipeCommentCtrl",swipeCommentCtrl);