var adviceCommentsCtrl=function(AdviceCommentsManager,$scope,$state,$stateParams,$http,$rootScope,$location,$uibModal,$log,$filter){var vm=this;vm.adviceId=$stateParams.adviceId,vm.adviceCommentsCopy,vm.adviceCommentsManager=new AdviceCommentsManager,vm.commentFormDisplay=!1,vm.defaultAdviceCommentData={adviceId:$stateParams.adviceId,privacy:0},vm.newAdviceCommentData=angular.copy(vm.defaultAdviceCommentData),vm.showCommentForm=function(){vm.commentFormDisplay=!0},vm.createAdviceComment=function(data){vm.adviceCommentsManager.createAdviceComment(data).then(function(response){vm.commentFormDisplay=!1,vm.newAdviceCommentData=angular.copy(vm.defaultAdviceCommentData),vm.adviceCommentsCopy=angular.copy(vm.adviceCommentsManager.adviceComments)},function(response){console.log(response)})},vm.editAdviceComment=function(data){vm.adviceCommentsManager.editAdviceComment(data).then(function(response){vm.commentFormDisplay=!1,vm.newAdviceCommentData=angular.copy(vm.defaultAdviceCommentData),vm.adviceCommentsCopy=angular.copy(vm.adviceCommentsManager.adviceComments)},function(response){console.log(response)})},vm.editAdviceCommentSections={details:function(adviceCommentId,detail){var adviceCommentData={adviceCommentId:adviceCommentId,title:detail.title,description:detail.description};vm.editAdviceComment(adviceCommentData)}},vm.cancelAdviceComment=function(form){vm.commentFormDisplay=!1,vm.newAdviceCommentData=angular.copy(vm.defaultAdviceCommentData),form&&(form.$setPristine(),form.$setUntouched())},vm.revertAdviceComment=function(adviceComment,adviceCommentCopy){adviceComment=adviceCommentCopy},vm.editedComment=null,$scope.$watch(angular.bind(this,function(){return vm.adviceComments}),function(){vm.doneCount=vm.adviceCommentsManager.adviceComments.length-vm.remainingCount,vm.allChecked=!vm.remainingCount},!0),vm.editComment=function(adviceComment){vm.editedComment=adviceComment,vm.originalComment=angular.copy(adviceComment)},vm.doneEditing=function(adviceComment){vm.editedComment=null,adviceComment.title=adviceComment.title.trim(),adviceComment.title||vm.removeComment(adviceComment)},vm.openAdviceComment=function(adviceComment){var modalInstance=$uibModal.open({animation:!0,templateUrl:"advice-comment-modal.html",controller:"AdviceCommentCtrl as adviceCommentCtrl",backdrop:"static",size:"xl",resolve:{adviceCommentData:function(){return adviceComment}}});modalInstance.result.then(function(selectedItem){$scope.selected=selectedItem},function(){$log.info("Modal dismissed at: "+new Date)})},vm.adviceCommentsManager.getAdviceComments(vm.adviceId)};adviceCommentsCtrl.$inject=["AdviceCommentsManager","$scope","$state","$stateParams","$http","$rootScope","$location","$uibModal","$log","$filter"],angular.module("app.advices").controller("AdviceCommentsCtrl",adviceCommentsCtrl);