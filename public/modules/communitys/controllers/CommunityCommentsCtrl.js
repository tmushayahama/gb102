var communityCommentsCtrl = function (
        CommunityCommentsManager,
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
 vm.communityId = $stateParams.communityId;
 vm.communityCommentsCopy;
 vm.communityCommentsManager = new CommunityCommentsManager();
 vm.commentFormDisplay = false;
 vm.defaultCommunityCommentData = {
  communityId: $stateParams.communityId,
  privacy: 0
 }
 vm.newCommunityCommentData = angular.copy(vm.defaultCommunityCommentData);
 vm.showCommentForm = function () {
  vm.commentFormDisplay = true;
 };
 vm.createCommunityComment = function (data) {
  vm.communityCommentsManager.createCommunityComment(data).then(function (response) {
   vm.commentFormDisplay = false;
   vm.newCommunityCommentData = angular.copy(vm.defaultCommunityCommentData);
   vm.communityCommentsCopy = angular.copy(vm.communityCommentsManager.communityComments);
  }, function (response) {
   console.log(response);
  });
 };
 vm.editCommunityComment = function (data) {
  vm.communityCommentsManager.editCommunityComment(data).then(function (response) {
   vm.commentFormDisplay = false;
   vm.newCommunityCommentData = angular.copy(vm.defaultCommunityCommentData);
   vm.communityCommentsCopy = angular.copy(vm.communityCommentsManager.communityComments);
  }, function (response) {
   console.log(response);
  });
 };
 vm.editCommunityCommentSections = {
  details: function (communityCommentId, detail) {
   var communityCommentData = {
    communityCommentId: communityCommentId,
    title: detail.title,
    description: detail.description
   };
   vm.editCommunityComment(communityCommentData);
  }
 }

 vm.cancelCommunityComment = function (form) {
  vm.commentFormDisplay = false;
  vm.newCommunityCommentData = angular.copy(vm.defaultCommunityCommentData)
  if (form) {
   form.$setPristine();
   form.$setUntouched();
  }
 };
 vm.revertCommunityComment = function (communityComment, communityCommentCopy) {
  communityComment = communityCommentCopy;
  /*
   $filter('filter')
   (vm.communityCommentsManager.communityComments, {id: communityCommentId}, true)[0]
   = angular.copy($filter('filter')
   (vm.communityCommentsCopy, {id: communityCommentId}, true)[0]);
   if (communityComment.length && communityCommentCopy.length) {
   // vm.communityCommentsManager.communityComments angular.copy(vm.communityCommentsCopy);
   }
   */
 };
 vm.editedComment = null;
 $scope.$watch(angular.bind(this, function () {
  return vm.communityComments;
 }), function () {
  //vm.remainingCount = filterFilter(communityComments, {completed: false}).length;
  vm.doneCount = vm.communityCommentsManager.communityComments.length - vm.remainingCount;
  vm.allChecked = !vm.remainingCount;
  //CommunityCommentService.put(vm.communityComments);
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




 vm.editComment = function (communityComment) {
  vm.editedComment = communityComment;
  // Clone the original communityComment to restore it on demand.
  vm.originalComment = angular.copy(communityComment);
 };
 vm.doneEditing = function (communityComment) {
  vm.editedComment = null;
  communityComment.title = communityComment.title.trim();
  if (!communityComment.title) {
   vm.removeComment(communityComment);
  }
 };
 vm.openCommunityComment = function (communityComment) {
  var modalInstance = $uibModal.open({
   animation: true,
   templateUrl: 'community-comment-modal.html',
   controller: 'CommunityCommentCtrl as communityCommentCtrl',
   backdrop: 'static',
   size: 'xl',
   resolve: {
    communityCommentData: function () {
     return communityComment;
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
 vm.communityCommentsManager.getCommunityComments(vm.communityId);
};

communityCommentsCtrl.$inject = [
 'CommunityCommentsManager',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$uibModal',
 '$log',
 '$filter'];

angular.module("app.communitys").controller('CommunityCommentsCtrl', communityCommentsCtrl);
