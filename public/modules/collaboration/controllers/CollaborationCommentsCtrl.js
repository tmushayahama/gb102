var collaborationCommentsCtrl = function (
        CollaborationCommentsSrv,
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
 vm.collaborationId = $stateParams.collaborationId;
 vm.collaborationCommentsCopy;
 vm.collaborationCommentsSrv = new CollaborationCommentsSrv();
 vm.commentFormDisplay = false;
 vm.defaultCollaborationCommentData = {
  collaborationId: $stateParams.collaborationId,
  privacy: 0
 }
 vm.newCollaborationCommentData = angular.copy(vm.defaultCollaborationCommentData);
 vm.showCommentForm = function () {
  vm.commentFormDisplay = true;
 };
 vm.createCollaborationComment = function (data) {
  vm.collaborationCommentsSrv.createCollaborationComment(data).then(function (response) {
   vm.commentFormDisplay = false;
   vm.newCollaborationCommentData = angular.copy(vm.defaultCollaborationCommentData);
   vm.collaborationCommentsCopy = angular.copy(vm.collaborationCommentsSrv.collaborationComments);
  }, function (response) {
   console.log(response);
  });
 };
 vm.editCollaborationComment = function (data) {
  vm.collaborationCommentsSrv.editCollaborationComment(data).then(function (response) {
   vm.commentFormDisplay = false;
   vm.newCollaborationCommentData = angular.copy(vm.defaultCollaborationCommentData);
   vm.collaborationCommentsCopy = angular.copy(vm.collaborationCommentsSrv.collaborationComments);
  }, function (response) {
   console.log(response);
  });
 };
 vm.editCollaborationCommentSections = {
  details: function (collaborationCommentId, detail) {
   var collaborationCommentData = {
    collaborationCommentId: collaborationCommentId,
    title: detail.title,
    description: detail.description
   };
   vm.editCollaborationComment(collaborationCommentData);
  }
 }

 vm.cancelCollaborationComment = function (form) {
  vm.commentFormDisplay = false;
  vm.newCollaborationCommentData = angular.copy(vm.defaultCollaborationCommentData)
  if (form) {
   form.$setPristine();
   form.$setUntouched();
  }
 };
 vm.revertCollaborationComment = function (collaborationComment, collaborationCommentCopy) {
  collaborationComment = collaborationCommentCopy;
  /*
   $filter('filter')
   (vm.collaborationCommentsSrv.collaborationComments, {id: collaborationCommentId}, true)[0]
   = angular.copy($filter('filter')
   (vm.collaborationCommentsCopy, {id: collaborationCommentId}, true)[0]);
   if (collaborationComment.length && collaborationCommentCopy.length) {
   // vm.collaborationCommentsSrv.collaborationComments angular.copy(vm.collaborationCommentsCopy);
   }
   */
 };
 vm.editedComment = null;
 $scope.$watch(angular.bind(this, function () {
  return vm.collaborationComments;
 }), function () {
  //vm.remainingCount = filterFilter(collaborationComments, {completed: false}).length;
  vm.doneCount = vm.collaborationCommentsSrv.collaborationComments.length - vm.remainingCount;
  vm.allChecked = !vm.remainingCount;
  //CollaborationCommentService.put(vm.collaborationComments);
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




 vm.editComment = function (collaborationComment) {
  vm.editedComment = collaborationComment;
  // Clone the original collaborationComment to restore it on demand.
  vm.originalComment = angular.copy(collaborationComment);
 };
 vm.doneEditing = function (collaborationComment) {
  vm.editedComment = null;
  collaborationComment.title = collaborationComment.title.trim();
  if (!collaborationComment.title) {
   vm.removeComment(collaborationComment);
  }
 };
 vm.openCollaborationComment = function (collaborationComment) {
  var modalInstance = $uibModal.open({
   animation: true,
   templateUrl: 'collaboration-comment-modal.html',
   controller: 'CollaborationCommentCtrl as collaborationCommentCtrl',
   backdrop: 'static',
   size: 'xl',
   resolve: {
    collaborationCommentData: function () {
     return collaborationComment;
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
 vm.collaborationCommentsSrv.getCollaborationComments(vm.collaborationId);
};

collaborationCommentsCtrl.$inject = [
 'CollaborationCommentsSrv',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$uibModal',
 '$log',
 '$filter'];

angular.module("app.collaboration").controller('CollaborationCommentsCtrl', collaborationCommentsCtrl);
