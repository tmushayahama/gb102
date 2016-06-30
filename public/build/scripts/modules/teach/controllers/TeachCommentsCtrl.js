var teachCommentsCtrl=function(TeachCommentsSrv,$scope,$state,$stateParams,$http,$rootScope,$location,$uibModal,$log,$filter){var vm=this;vm.teachId=$stateParams.teachId,vm.teachCommentsCopy,vm.teachCommentsSrv=new TeachCommentsSrv,vm.commentFormDisplay=!1,vm.defaultTeachCommentData={teachId:$stateParams.teachId,privacy:0},vm.newTeachCommentData=angular.copy(vm.defaultTeachCommentData),vm.showCommentForm=function(){vm.commentFormDisplay=!0},vm.createTeachComment=function(data){vm.teachCommentsSrv.createTeachComment(data).then(function(response){vm.commentFormDisplay=!1,vm.newTeachCommentData=angular.copy(vm.defaultTeachCommentData),vm.teachCommentsCopy=angular.copy(vm.teachCommentsSrv.teachComments)},function(response){console.log(response)})},vm.editTeachComment=function(data){vm.teachCommentsSrv.editTeachComment(data).then(function(response){vm.commentFormDisplay=!1,vm.newTeachCommentData=angular.copy(vm.defaultTeachCommentData),vm.teachCommentsCopy=angular.copy(vm.teachCommentsSrv.teachComments)},function(response){console.log(response)})},vm.editTeachCommentSections={details:function(teachCommentId,detail){var teachCommentData={teachCommentId:teachCommentId,title:detail.title,description:detail.description};vm.editTeachComment(teachCommentData)}},vm.cancelTeachComment=function(form){vm.commentFormDisplay=!1,vm.newTeachCommentData=angular.copy(vm.defaultTeachCommentData),form&&(form.$setPristine(),form.$setUntouched())},vm.revertTeachComment=function(teachComment,teachCommentCopy){teachComment=teachCommentCopy},vm.editedComment=null,$scope.$watch(angular.bind(this,function(){return vm.teachComments}),function(){vm.doneCount=vm.teachCommentsSrv.teachComments.length-vm.remainingCount,vm.allChecked=!vm.remainingCount},!0),vm.editComment=function(teachComment){vm.editedComment=teachComment,vm.originalComment=angular.copy(teachComment)},vm.doneEditing=function(teachComment){vm.editedComment=null,teachComment.title=teachComment.title.trim(),teachComment.title||vm.removeComment(teachComment)},vm.openTeachComment=function(teachComment){var modalInstance=$uibModal.open({animation:!0,templateUrl:"teach-comment-modal.html",controller:"TeachCommentCtrl as teachCommentCtrl",backdrop:"static",size:"xl",resolve:{teachCommentData:function(){return teachComment}}});modalInstance.result.then(function(selectedItem){$scope.selected=selectedItem},function(){$log.info("Modal dismissed at: "+new Date)})},vm.teachCommentsSrv.getTeachComments(vm.teachId)};teachCommentsCtrl.$inject=["TeachCommentsSrv","$scope","$state","$stateParams","$http","$rootScope","$location","$uibModal","$log","$filter"],angular.module("app.teach").controller("TeachCommentsCtrl",teachCommentsCtrl);