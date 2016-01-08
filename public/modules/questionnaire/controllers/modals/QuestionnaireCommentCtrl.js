var questionnaireCommentCtrl = function (
        QuestionnaireCommentManager,
        $uibModalInstance,
        $scope,
        $state,
        $stateParams,
        $http,
        $rootScope,
        $location,
        $log,
        questionnaireCommentData) {
 var vm = this;
 vm.questionnaireId = questionnaireCommentData.questionnaire_id;
 vm.questionnaireCommentId = questionnaireCommentData.id;
 vm.questionnaireCommentManager = new QuestionnaireCommentManager();


 vm.commentId = questionnaireCommentData.comment_id;

 vm.commentFormDisplay = false;




 vm.ok = function () {
  $uibModalInstance.close();
 };

 vm.close = function () {
  $uibModalInstance.dismiss('cancel');
 };

 // vm.newQuestionnaireCommentData = vm.defaultQuestionnaireCommentData;

 vm.getQuestionnaireComment = function (questionnaireId, commentId) {
  vm.questionnaireCommentManager.getQuestionnaireComment(questionnaireId, commentId).then(function (response) {
  }, function (error) {
   console.log(error);
  });
 };

 vm.editQuestionnaireComment = function (data) {
  vm.questionnaireCommentManager.editQuestionnaireComment(data).then(function (response) {
  }, function (response) {
   console.log(response);
  });
 };

 vm.editQuestionnaireCommentSections = {
  details: function (details) {
   var questionnaireCommentData = {
    questionnaireCommentId: vm.questionnaireCommentId,
    title: details.title,
    description: details.description
   };
   vm.editQuestionnaireComment(questionnaireCommentData);
  }
 }



 vm.showCommentForm = function () {
  vm.commentFormDisplay = true;
 };



 //--------init------
 vm.getQuestionnaireComment(vm.questionnaireId, vm.commentId);
};

questionnaireCommentCtrl.$inject = [
 'QuestionnaireCommentManager',
 '$uibModalInstance',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$log',
 'questionnaireCommentData'];

angular.module("app.questionnaire").controller('QuestionnaireCommentCtrl', questionnaireCommentCtrl);
