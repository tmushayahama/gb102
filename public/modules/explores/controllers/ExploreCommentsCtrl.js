var exploreCommentsCtrl = function (
        ExploreCommentsManager,
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
 vm.exploreId = $stateParams.exploreId;
 vm.exploreCommentsCopy;
 vm.exploreCommentsManager = new ExploreCommentsManager();
 vm.commentFormDisplay = false;
 vm.defaultExploreCommentData = {
  exploreId: $stateParams.exploreId,
  privacy: 0
 }
 vm.newExploreCommentData = angular.copy(vm.defaultExploreCommentData);
 vm.showCommentForm = function () {
  vm.commentFormDisplay = true;
 };
 vm.createExploreComment = function (data) {
  vm.exploreCommentsManager.createExploreComment(data).then(function (response) {
   vm.commentFormDisplay = false;
   vm.newExploreCommentData = angular.copy(vm.defaultExploreCommentData);
   vm.exploreCommentsCopy = angular.copy(vm.exploreCommentsManager.exploreComments);
  }, function (response) {
   console.log(response);
  });
 };
 vm.editExploreComment = function (data) {
  vm.exploreCommentsManager.editExploreComment(data).then(function (response) {
   vm.commentFormDisplay = false;
   vm.newExploreCommentData = angular.copy(vm.defaultExploreCommentData);
   vm.exploreCommentsCopy = angular.copy(vm.exploreCommentsManager.exploreComments);
  }, function (response) {
   console.log(response);
  });
 };
 vm.editExploreCommentSections = {
  details: function (exploreCommentId, detail) {
   var exploreCommentData = {
    exploreCommentId: exploreCommentId,
    title: detail.title,
    description: detail.description
   };
   vm.editExploreComment(exploreCommentData);
  }
 }

 vm.cancelExploreComment = function (form) {
  vm.commentFormDisplay = false;
  vm.newExploreCommentData = angular.copy(vm.defaultExploreCommentData)
  if (form) {
   form.$setPristine();
   form.$setUntouched();
  }
 };
 vm.revertExploreComment = function (exploreComment, exploreCommentCopy) {
  exploreComment = exploreCommentCopy;
  /*
   $filter('filter')
   (vm.exploreCommentsManager.exploreComments, {id: exploreCommentId}, true)[0]
   = angular.copy($filter('filter')
   (vm.exploreCommentsCopy, {id: exploreCommentId}, true)[0]);
   if (exploreComment.length && exploreCommentCopy.length) {
   // vm.exploreCommentsManager.exploreComments angular.copy(vm.exploreCommentsCopy);
   }
   */
 };
 vm.editedComment = null;
 $scope.$watch(angular.bind(this, function () {
  return vm.exploreComments;
 }), function () {
  //vm.remainingCount = filterFilter(exploreComments, {completed: false}).length;
  vm.doneCount = vm.exploreCommentsManager.exploreComments.length - vm.remainingCount;
  vm.allChecked = !vm.remainingCount;
  //ExploreCommentService.put(vm.exploreComments);
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




 vm.editComment = function (exploreComment) {
  vm.editedComment = exploreComment;
  // Clone the original exploreComment to restore it on demand.
  vm.originalComment = angular.copy(exploreComment);
 };
 vm.doneEditing = function (exploreComment) {
  vm.editedComment = null;
  exploreComment.title = exploreComment.title.trim();
  if (!exploreComment.title) {
   vm.removeComment(exploreComment);
  }
 };
 vm.openExploreComment = function (exploreComment) {
  var modalInstance = $uibModal.open({
   animation: true,
   templateUrl: 'explore-comment-modal.html',
   controller: 'ExploreCommentCtrl as exploreCommentCtrl',
   backdrop: 'static',
   size: 'xl',
   resolve: {
    exploreCommentData: function () {
     return exploreComment;
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
 vm.exploreCommentsManager.getExploreComments(vm.exploreId);
};

exploreCommentsCtrl.$inject = [
 'ExploreCommentsManager',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$uibModal',
 '$log',
 '$filter'];

angular.module("app.explores").controller('ExploreCommentsCtrl', exploreCommentsCtrl);
