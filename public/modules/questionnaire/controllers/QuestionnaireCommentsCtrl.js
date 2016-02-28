var questionnaireCommentsCtrl = function (
        QuestionnaireCommentsSrv,
        $scope,
        $state,
        $stateParams,
        $http,
        $rootScope,
        $location,
        $uibModal,
        $log,
        $filter) {

 var vm = this;
 vm.questionnaireId = $stateParams.questionnaireId;
 vm.questionnaireCommentsCopy;
 vm.questionnaireCommentsSrv = new QuestionnaireCommentsSrv();
 vm.commentFormDisplay = false;
 vm.defaultQuestionnaireCommentData = {
  questionnaireId: $stateParams.questionnaireId,
  privacy: 0
 }
 vm.newQuestionnaireCommentData = angular.copy(vm.defaultQuestionnaireCommentData);
 vm.showCommentForm = function () {
  vm.commentFormDisplay = true;
 };
 vm.createQuestionnaireComment = function (data) {
  vm.questionnaireCommentsSrv.createQuestionnaireComment(data).then(function (response) {
   vm.commentFormDisplay = false;
   vm.newQuestionnaireCommentData = angular.copy(vm.defaultQuestionnaireCommentData);
   vm.questionnaireCommentsCopy = angular.copy(vm.questionnaireCommentsSrv.questionnaireComments);
  }, function (response) {
   console.log(response);
  });
 };
 vm.editQuestionnaireComment = function (data) {
  vm.questionnaireCommentsSrv.editQuestionnaireComment(data).then(function (response) {
   vm.commentFormDisplay = false;
   vm.newQuestionnaireCommentData = angular.copy(vm.defaultQuestionnaireCommentData);
   vm.questionnaireCommentsCopy = angular.copy(vm.questionnaireCommentsSrv.questionnaireComments);
  }, function (response) {
   console.log(response);
  });
 };
 vm.editQuestionnaireCommentSections = {
  details: function (questionnaireCommentId, detail) {
   var questionnaireCommentData = {
    questionnaireCommentId: questionnaireCommentId,
    title: detail.title,
    description: detail.description
   };
   vm.editQuestionnaireComment(questionnaireCommentData);
  }
 }

 vm.cancelQuestionnaireComment = function (form) {
  vm.commentFormDisplay = false;
  vm.newQuestionnaireCommentData = angular.copy(vm.defaultQuestionnaireCommentData)
  if (form) {
   form.$setPristine();
   form.$setUntouched();
  }
 };
 vm.revertQuestionnaireComment = function (questionnaireComment, questionnaireCommentCopy) {
  questionnaireComment = questionnaireCommentCopy;
  /*
   $filter('filter')
   (vm.questionnaireCommentsSrv.questionnaireComments, {id: questionnaireCommentId}, true)[0]
   = angular.copy($filter('filter')
   (vm.questionnaireCommentsCopy, {id: questionnaireCommentId}, true)[0]);
   if (questionnaireComment.length && questionnaireCommentCopy.length) {
   // vm.questionnaireCommentsSrv.questionnaireComments angular.copy(vm.questionnaireCommentsCopy);
   }
   */
 };
 vm.editedComment = null;
 $scope.$watch(angular.bind(this, function () {
  return vm.questionnaireComments;
 }), function () {
  //vm.remainingCount = filterFilter(questionnaireComments, {completed: false}).length;
  vm.doneCount = vm.questionnaireCommentsSrv.questionnaireComments.length - vm.remainingCount;
  vm.allChecked = !vm.remainingCount;
  //QuestionnaireCommentService.put(vm.questionnaireComments);
 }, true);
 /*
  $scope.$watch(angular.bind(this, function () {
  return vm.location.path();
  }), function (path) {
  vm.statusFilter = (path === '/active') ?
  {completed: false} : (path === '/completed') ?
  {completed: true} : null;
  });
  */




 vm.editComment = function (questionnaireComment) {
  vm.editedComment = questionnaireComment;
  // Clone the original questionnaireComment to restore it on demand.
  vm.originalComment = angular.copy(questionnaireComment);
 };
 vm.doneEditing = function (questionnaireComment) {
  vm.editedComment = null;
  questionnaireComment.title = questionnaireComment.title.trim();
  if (!questionnaireComment.title) {
   vm.removeComment(questionnaireComment);
  }
 };
 vm.openQuestionnaireComment = function (questionnaireComment) {
  var modalInstance = $uibModal.open({
   animation: true,
   templateUrl: 'questionnaire-comment-modal.html',
   controller: 'QuestionnaireCommentCtrl as questionnaireCommentCtrl',
   backdrop: 'static',
   size: 'xl',
   resolve: {
    questionnaireCommentData: function () {
     return questionnaireComment;
    }
   }
  });
  modalInstance.result.then(function (selectedItem) {
   $scope.selected = selectedItem;
  }, function () {
   $log.info('Modal dismissed at: ' + new Date());
  });
 };
 //--------init------
 vm.questionnaireCommentsSrv.getQuestionnaireComments(vm.questionnaireId);
};

questionnaireCommentsCtrl.$inject = [
 'QuestionnaireCommentsSrv',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$uibModal',
 '$log',
 '$filter'];

angular.module("app.questionnaire").controller('QuestionnaireCommentsCtrl', questionnaireCommentsCtrl);
