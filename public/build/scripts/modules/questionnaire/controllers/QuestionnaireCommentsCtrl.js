var questionnaireCommentsCtrl=function(QuestionnaireCommentsManager,$scope,$state,$stateParams,$http,$rootScope,$location,$uibModal,$log,$filter){var vm=this;vm.questionnaireId=$stateParams.questionnaireId,vm.questionnaireCommentsCopy,vm.questionnaireCommentsManager=new QuestionnaireCommentsManager,vm.commentFormDisplay=!1,vm.defaultQuestionnaireCommentData={questionnaireId:$stateParams.questionnaireId,privacy:0},vm.newQuestionnaireCommentData=angular.copy(vm.defaultQuestionnaireCommentData),vm.showCommentForm=function(){vm.commentFormDisplay=!0},vm.createQuestionnaireComment=function(data){vm.questionnaireCommentsManager.createQuestionnaireComment(data).then(function(response){vm.commentFormDisplay=!1,vm.newQuestionnaireCommentData=angular.copy(vm.defaultQuestionnaireCommentData),vm.questionnaireCommentsCopy=angular.copy(vm.questionnaireCommentsManager.questionnaireComments)},function(response){console.log(response)})},vm.editQuestionnaireComment=function(data){vm.questionnaireCommentsManager.editQuestionnaireComment(data).then(function(response){vm.commentFormDisplay=!1,vm.newQuestionnaireCommentData=angular.copy(vm.defaultQuestionnaireCommentData),vm.questionnaireCommentsCopy=angular.copy(vm.questionnaireCommentsManager.questionnaireComments)},function(response){console.log(response)})},vm.editQuestionnaireCommentSections={details:function(questionnaireCommentId,detail){var questionnaireCommentData={questionnaireCommentId:questionnaireCommentId,title:detail.title,description:detail.description};vm.editQuestionnaireComment(questionnaireCommentData)}},vm.cancelQuestionnaireComment=function(form){vm.commentFormDisplay=!1,vm.newQuestionnaireCommentData=angular.copy(vm.defaultQuestionnaireCommentData),form&&(form.$setPristine(),form.$setUntouched())},vm.revertQuestionnaireComment=function(questionnaireComment,questionnaireCommentCopy){questionnaireComment=questionnaireCommentCopy},vm.editedComment=null,$scope.$watch(angular.bind(this,function(){return vm.questionnaireComments}),function(){vm.doneCount=vm.questionnaireCommentsManager.questionnaireComments.length-vm.remainingCount,vm.allChecked=!vm.remainingCount},!0),vm.editComment=function(questionnaireComment){vm.editedComment=questionnaireComment,vm.originalComment=angular.copy(questionnaireComment)},vm.doneEditing=function(questionnaireComment){vm.editedComment=null,questionnaireComment.title=questionnaireComment.title.trim(),questionnaireComment.title||vm.removeComment(questionnaireComment)},vm.openQuestionnaireComment=function(questionnaireComment){var modalInstance=$uibModal.open({animation:!0,templateUrl:"questionnaire-comment-modal.html",controller:"QuestionnaireCommentCtrl as questionnaireCommentCtrl",backdrop:"static",size:"xl",resolve:{questionnaireCommentData:function(){return questionnaireComment}}});modalInstance.result.then(function(selectedItem){$scope.selected=selectedItem},function(){$log.info("Modal dismissed at: "+new Date)})},vm.questionnaireCommentsManager.getQuestionnaireComments(vm.questionnaireId)};questionnaireCommentsCtrl.$inject=["QuestionnaireCommentsManager","$scope","$state","$stateParams","$http","$rootScope","$location","$uibModal","$log","$filter"],angular.module("app.questionnaire").controller("QuestionnaireCommentsCtrl",questionnaireCommentsCtrl);