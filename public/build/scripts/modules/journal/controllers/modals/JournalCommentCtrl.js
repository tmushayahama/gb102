var journalCommentCtrl=function(JournalCommentManager,$uibModalInstance,$scope,$state,$stateParams,$http,$rootScope,$location,$log,journalCommentData){var vm=this;vm.journalId=journalCommentData.journal_id,vm.journalCommentId=journalCommentData.id,vm.journalCommentManager=new JournalCommentManager,vm.commentId=journalCommentData.comment_id,vm.commentFormDisplay=!1,vm.ok=function(){$uibModalInstance.close()},vm.close=function(){$uibModalInstance.dismiss("cancel")},vm.getJournalComment=function(journalId,commentId){vm.journalCommentManager.getJournalComment(journalId,commentId).then(function(response){},function(error){console.log(error)})},vm.editJournalComment=function(data){vm.journalCommentManager.editJournalComment(data).then(function(response){},function(response){console.log(response)})},vm.editJournalCommentSections={details:function(details){var journalCommentData={journalCommentId:vm.journalCommentId,title:details.title,description:details.description};vm.editJournalComment(journalCommentData)}},vm.showCommentForm=function(){vm.commentFormDisplay=!0},vm.getJournalComment(vm.journalId,vm.commentId)};journalCommentCtrl.$inject=["JournalCommentManager","$uibModalInstance","$scope","$state","$stateParams","$http","$rootScope","$location","$log","journalCommentData"],angular.module("app.journal").controller("JournalCommentCtrl",journalCommentCtrl);