var journalCommentsCtrl = function (
        JournalCommentsManager,
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
 vm.journalId = $stateParams.journalId;
 vm.journalCommentsCopy;
 vm.journalCommentsManager = new JournalCommentsManager();
 vm.commentFormDisplay = false;
 vm.defaultJournalCommentData = {
  journalId: $stateParams.journalId,
  privacy: 0
 }
 vm.newJournalCommentData = angular.copy(vm.defaultJournalCommentData);
 vm.showCommentForm = function () {
  vm.commentFormDisplay = true;
 };
 vm.createJournalComment = function (data) {
  vm.journalCommentsManager.createJournalComment(data).then(function (response) {
   vm.commentFormDisplay = false;
   vm.newJournalCommentData = angular.copy(vm.defaultJournalCommentData);
   vm.journalCommentsCopy = angular.copy(vm.journalCommentsManager.journalComments);
  }, function (response) {
   console.log(response);
  });
 };
 vm.editJournalComment = function (data) {
  vm.journalCommentsManager.editJournalComment(data).then(function (response) {
   vm.commentFormDisplay = false;
   vm.newJournalCommentData = angular.copy(vm.defaultJournalCommentData);
   vm.journalCommentsCopy = angular.copy(vm.journalCommentsManager.journalComments);
  }, function (response) {
   console.log(response);
  });
 };
 vm.editJournalCommentSections = {
  details: function (journalCommentId, detail) {
   var journalCommentData = {
    journalCommentId: journalCommentId,
    title: detail.title,
    description: detail.description
   };
   vm.editJournalComment(journalCommentData);
  }
 }

 vm.cancelJournalComment = function (form) {
  vm.commentFormDisplay = false;
  vm.newJournalCommentData = angular.copy(vm.defaultJournalCommentData)
  if (form) {
   form.$setPristine();
   form.$setUntouched();
  }
 };
 vm.revertJournalComment = function (journalComment, journalCommentCopy) {
  journalComment = journalCommentCopy;
  /*
   $filter('filter')
   (vm.journalCommentsManager.journalComments, {id: journalCommentId}, true)[0]
   = angular.copy($filter('filter')
   (vm.journalCommentsCopy, {id: journalCommentId}, true)[0]);
   if (journalComment.length && journalCommentCopy.length) {
   // vm.journalCommentsManager.journalComments angular.copy(vm.journalCommentsCopy);
   }
   */
 };
 vm.editedComment = null;
 $scope.$watch(angular.bind(this, function () {
  return vm.journalComments;
 }), function () {
  //vm.remainingCount = filterFilter(journalComments, {completed: false}).length;
  vm.doneCount = vm.journalCommentsManager.journalComments.length - vm.remainingCount;
  vm.allChecked = !vm.remainingCount;
  //JournalCommentService.put(vm.journalComments);
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




 vm.editComment = function (journalComment) {
  vm.editedComment = journalComment;
  // Clone the original journalComment to restore it on demand.
  vm.originalComment = angular.copy(journalComment);
 };
 vm.doneEditing = function (journalComment) {
  vm.editedComment = null;
  journalComment.title = journalComment.title.trim();
  if (!journalComment.title) {
   vm.removeComment(journalComment);
  }
 };
 vm.openJournalComment = function (journalComment) {
  var modalInstance = $uibModal.open({
   animation: true,
   templateUrl: 'journal-comment-modal.html',
   controller: 'JournalCommentCtrl as journalCommentCtrl',
   backdrop: 'static',
   size: 'xl',
   resolve: {
    journalCommentData: function () {
     return journalComment;
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
 vm.journalCommentsManager.getJournalComments(vm.journalId);
};

journalCommentsCtrl.$inject = [
 'JournalCommentsManager',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$uibModal',
 '$log',
 '$filter'];

angular.module("app.journal").controller('JournalCommentsCtrl', journalCommentsCtrl);
