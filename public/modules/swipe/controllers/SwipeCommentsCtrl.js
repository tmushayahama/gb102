var swipeCommentsCtrl = function (
        SwipeCommentsManager,
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
 vm.swipeId = $stateParams.swipeId;
 vm.swipeCommentsCopy;
 vm.swipeCommentsManager = new SwipeCommentsManager();
 vm.commentFormDisplay = false;
 vm.defaultSwipeCommentData = {
  swipeId: $stateParams.swipeId,
  privacy: 0
 }
 vm.newSwipeCommentData = angular.copy(vm.defaultSwipeCommentData);
 vm.showCommentForm = function () {
  vm.commentFormDisplay = true;
 };
 vm.createSwipeComment = function (data) {
  vm.swipeCommentsManager.createSwipeComment(data).then(function (response) {
   vm.commentFormDisplay = false;
   vm.newSwipeCommentData = angular.copy(vm.defaultSwipeCommentData);
   vm.swipeCommentsCopy = angular.copy(vm.swipeCommentsManager.swipeComments);
  }, function (response) {
   console.log(response);
  });
 };
 vm.editSwipeComment = function (data) {
  vm.swipeCommentsManager.editSwipeComment(data).then(function (response) {
   vm.commentFormDisplay = false;
   vm.newSwipeCommentData = angular.copy(vm.defaultSwipeCommentData);
   vm.swipeCommentsCopy = angular.copy(vm.swipeCommentsManager.swipeComments);
  }, function (response) {
   console.log(response);
  });
 };
 vm.editSwipeCommentSections = {
  details: function (swipeCommentId, detail) {
   var swipeCommentData = {
    swipeCommentId: swipeCommentId,
    title: detail.title,
    description: detail.description
   };
   vm.editSwipeComment(swipeCommentData);
  }
 }

 vm.cancelSwipeComment = function (form) {
  vm.commentFormDisplay = false;
  vm.newSwipeCommentData = angular.copy(vm.defaultSwipeCommentData)
  if (form) {
   form.$setPristine();
   form.$setUntouched();
  }
 };
 vm.revertSwipeComment = function (swipeComment, swipeCommentCopy) {
  swipeComment = swipeCommentCopy;
  /*
   $filter('filter')
   (vm.swipeCommentsManager.swipeComments, {id: swipeCommentId}, true)[0]
   = angular.copy($filter('filter')
   (vm.swipeCommentsCopy, {id: swipeCommentId}, true)[0]);
   if (swipeComment.length && swipeCommentCopy.length) {
   // vm.swipeCommentsManager.swipeComments angular.copy(vm.swipeCommentsCopy);
   }
   */
 };
 vm.editedComment = null;
 $scope.$watch(angular.bind(this, function () {
  return vm.swipeComments;
 }), function () {
  //vm.remainingCount = filterFilter(swipeComments, {completed: false}).length;
  vm.doneCount = vm.swipeCommentsManager.swipeComments.length - vm.remainingCount;
  vm.allChecked = !vm.remainingCount;
  //SwipeCommentService.put(vm.swipeComments);
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




 vm.editComment = function (swipeComment) {
  vm.editedComment = swipeComment;
  // Clone the original swipeComment to restore it on demand.
  vm.originalComment = angular.copy(swipeComment);
 };
 vm.doneEditing = function (swipeComment) {
  vm.editedComment = null;
  swipeComment.title = swipeComment.title.trim();
  if (!swipeComment.title) {
   vm.removeComment(swipeComment);
  }
 };
 vm.openSwipeComment = function (swipeComment) {
  var modalInstance = $uibModal.open({
   animation: true,
   templateUrl: 'swipe-comment-modal.html',
   controller: 'SwipeCommentCtrl as swipeCommentCtrl',
   backdrop: 'static',
   size: 'xl',
   resolve: {
    swipeCommentData: function () {
     return swipeComment;
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
 vm.swipeCommentsManager.getSwipeComments(vm.swipeId);
};

swipeCommentsCtrl.$inject = [
 'SwipeCommentsManager',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$uibModal',
 '$log',
 '$filter'];

angular.module("app.swipe").controller('SwipeCommentsCtrl', swipeCommentsCtrl);
