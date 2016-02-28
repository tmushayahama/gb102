var mentorshipCommentsCtrl = function (
        MentorshipCommentsSrv,
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
 vm.mentorshipId = $stateParams.mentorshipId;
 vm.mentorshipCommentsCopy;
 vm.mentorshipCommentsSrv = new MentorshipCommentsSrv();
 vm.commentFormDisplay = false;
 vm.defaultMentorshipCommentData = {
  mentorshipId: $stateParams.mentorshipId,
  privacy: 0
 }
 vm.newMentorshipCommentData = angular.copy(vm.defaultMentorshipCommentData);
 vm.showCommentForm = function () {
  vm.commentFormDisplay = true;
 };
 vm.createMentorshipComment = function (data) {
  vm.mentorshipCommentsSrv.createMentorshipComment(data).then(function (response) {
   vm.commentFormDisplay = false;
   vm.newMentorshipCommentData = angular.copy(vm.defaultMentorshipCommentData);
   vm.mentorshipCommentsCopy = angular.copy(vm.mentorshipCommentsSrv.mentorshipComments);
  }, function (response) {
   console.log(response);
  });
 };
 vm.editMentorshipComment = function (data) {
  vm.mentorshipCommentsSrv.editMentorshipComment(data).then(function (response) {
   vm.commentFormDisplay = false;
   vm.newMentorshipCommentData = angular.copy(vm.defaultMentorshipCommentData);
   vm.mentorshipCommentsCopy = angular.copy(vm.mentorshipCommentsSrv.mentorshipComments);
  }, function (response) {
   console.log(response);
  });
 };
 vm.editMentorshipCommentSections = {
  details: function (mentorshipCommentId, detail) {
   var mentorshipCommentData = {
    mentorshipCommentId: mentorshipCommentId,
    title: detail.title,
    description: detail.description
   };
   vm.editMentorshipComment(mentorshipCommentData);
  }
 }

 vm.cancelMentorshipComment = function (form) {
  vm.commentFormDisplay = false;
  vm.newMentorshipCommentData = angular.copy(vm.defaultMentorshipCommentData)
  if (form) {
   form.$setPristine();
   form.$setUntouched();
  }
 };
 vm.revertMentorshipComment = function (mentorshipComment, mentorshipCommentCopy) {
  mentorshipComment = mentorshipCommentCopy;
  /*
   $filter('filter')
   (vm.mentorshipCommentsSrv.mentorshipComments, {id: mentorshipCommentId}, true)[0]
   = angular.copy($filter('filter')
   (vm.mentorshipCommentsCopy, {id: mentorshipCommentId}, true)[0]);
   if (mentorshipComment.length && mentorshipCommentCopy.length) {
   // vm.mentorshipCommentsSrv.mentorshipComments angular.copy(vm.mentorshipCommentsCopy);
   }
   */
 };
 vm.editedComment = null;
 $scope.$watch(angular.bind(this, function () {
  return vm.mentorshipComments;
 }), function () {
  //vm.remainingCount = filterFilter(mentorshipComments, {completed: false}).length;
  vm.doneCount = vm.mentorshipCommentsSrv.mentorshipComments.length - vm.remainingCount;
  vm.allChecked = !vm.remainingCount;
  //MentorshipCommentService.put(vm.mentorshipComments);
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




 vm.editComment = function (mentorshipComment) {
  vm.editedComment = mentorshipComment;
  // Clone the original mentorshipComment to restore it on demand.
  vm.originalComment = angular.copy(mentorshipComment);
 };
 vm.doneEditing = function (mentorshipComment) {
  vm.editedComment = null;
  mentorshipComment.title = mentorshipComment.title.trim();
  if (!mentorshipComment.title) {
   vm.removeComment(mentorshipComment);
  }
 };
 vm.openMentorshipComment = function (mentorshipComment) {
  var modalInstance = $uibModal.open({
   animation: true,
   templateUrl: 'mentorship-comment-modal.html',
   controller: 'MentorshipCommentCtrl as mentorshipCommentCtrl',
   backdrop: 'static',
   size: 'xl',
   resolve: {
    mentorshipCommentData: function () {
     return mentorshipComment;
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
 vm.mentorshipCommentsSrv.getMentorshipComments(vm.mentorshipId);
};

mentorshipCommentsCtrl.$inject = [
 'MentorshipCommentsSrv',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$uibModal',
 '$log',
 '$filter'];

angular.module("app.mentorship").controller('MentorshipCommentsCtrl', mentorshipCommentsCtrl);
