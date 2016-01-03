var groupCommentsCtrl = function (
        GroupCommentsManager,
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
 vm.groupId = $stateParams.groupId;
 vm.groupCommentsCopy;
 vm.groupCommentsManager = new GroupCommentsManager();
 vm.commentFormDisplay = false;
 vm.defaultGroupCommentData = {
  groupId: $stateParams.groupId,
  privacy: 0
 }
 vm.newGroupCommentData = angular.copy(vm.defaultGroupCommentData);
 vm.showCommentForm = function () {
  vm.commentFormDisplay = true;
 };
 vm.createGroupComment = function (data) {
  vm.groupCommentsManager.createGroupComment(data).then(function (response) {
   vm.commentFormDisplay = false;
   vm.newGroupCommentData = angular.copy(vm.defaultGroupCommentData);
   vm.groupCommentsCopy = angular.copy(vm.groupCommentsManager.groupComments);
  }, function (response) {
   console.log(response);
  });
 };
 vm.editGroupComment = function (data) {
  vm.groupCommentsManager.editGroupComment(data).then(function (response) {
   vm.commentFormDisplay = false;
   vm.newGroupCommentData = angular.copy(vm.defaultGroupCommentData);
   vm.groupCommentsCopy = angular.copy(vm.groupCommentsManager.groupComments);
  }, function (response) {
   console.log(response);
  });
 };
 vm.editGroupCommentSections = {
  details: function (groupCommentId, detail) {
   var groupCommentData = {
    groupCommentId: groupCommentId,
    title: detail.title,
    description: detail.description
   };
   vm.editGroupComment(groupCommentData);
  }
 }

 vm.cancelGroupComment = function (form) {
  vm.commentFormDisplay = false;
  vm.newGroupCommentData = angular.copy(vm.defaultGroupCommentData)
  if (form) {
   form.$setPristine();
   form.$setUntouched();
  }
 };
 vm.revertGroupComment = function (groupComment, groupCommentCopy) {
  groupComment = groupCommentCopy;
  /*
   $filter('filter')
   (vm.groupCommentsManager.groupComments, {id: groupCommentId}, true)[0]
   = angular.copy($filter('filter')
   (vm.groupCommentsCopy, {id: groupCommentId}, true)[0]);
   if (groupComment.length && groupCommentCopy.length) {
   // vm.groupCommentsManager.groupComments angular.copy(vm.groupCommentsCopy);
   }
   */
 };
 vm.editedComment = null;
 $scope.$watch(angular.bind(this, function () {
  return vm.groupComments;
 }), function () {
  //vm.remainingCount = filterFilter(groupComments, {completed: false}).length;
  vm.doneCount = vm.groupCommentsManager.groupComments.length - vm.remainingCount;
  vm.allChecked = !vm.remainingCount;
  //GroupCommentService.put(vm.groupComments);
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




 vm.editComment = function (groupComment) {
  vm.editedComment = groupComment;
  // Clone the original groupComment to restore it on demand.
  vm.originalComment = angular.copy(groupComment);
 };
 vm.doneEditing = function (groupComment) {
  vm.editedComment = null;
  groupComment.title = groupComment.title.trim();
  if (!groupComment.title) {
   vm.removeComment(groupComment);
  }
 };
 vm.openGroupComment = function (groupComment) {
  var modalInstance = $uibModal.open({
   animation: true,
   templateUrl: 'group-comment-modal.html',
   controller: 'GroupCommentCtrl as groupCommentCtrl',
   backdrop: 'static',
   size: 'xl',
   resolve: {
    groupCommentData: function () {
     return groupComment;
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
 vm.groupCommentsManager.getGroupComments(vm.groupId);
};

groupCommentsCtrl.$inject = [
 'GroupCommentsManager',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$uibModal',
 '$log',
 '$filter'];

angular.module("app.groups").controller('GroupCommentsCtrl', groupCommentsCtrl);
