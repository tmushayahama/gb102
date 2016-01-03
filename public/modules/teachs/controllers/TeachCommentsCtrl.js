var teachCommentsCtrl = function (
        TeachCommentsManager,
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
 vm.teachId = $stateParams.teachId;
 vm.teachCommentsCopy;
 vm.teachCommentsManager = new TeachCommentsManager();
 vm.commentFormDisplay = false;
 vm.defaultTeachCommentData = {
  teachId: $stateParams.teachId,
  privacy: 0
 }
 vm.newTeachCommentData = angular.copy(vm.defaultTeachCommentData);
 vm.showCommentForm = function () {
  vm.commentFormDisplay = true;
 };
 vm.createTeachComment = function (data) {
  vm.teachCommentsManager.createTeachComment(data).then(function (response) {
   vm.commentFormDisplay = false;
   vm.newTeachCommentData = angular.copy(vm.defaultTeachCommentData);
   vm.teachCommentsCopy = angular.copy(vm.teachCommentsManager.teachComments);
  }, function (response) {
   console.log(response);
  });
 };
 vm.editTeachComment = function (data) {
  vm.teachCommentsManager.editTeachComment(data).then(function (response) {
   vm.commentFormDisplay = false;
   vm.newTeachCommentData = angular.copy(vm.defaultTeachCommentData);
   vm.teachCommentsCopy = angular.copy(vm.teachCommentsManager.teachComments);
  }, function (response) {
   console.log(response);
  });
 };
 vm.editTeachCommentSections = {
  details: function (teachCommentId, detail) {
   var teachCommentData = {
    teachCommentId: teachCommentId,
    title: detail.title,
    description: detail.description
   };
   vm.editTeachComment(teachCommentData);
  }
 }

 vm.cancelTeachComment = function (form) {
  vm.commentFormDisplay = false;
  vm.newTeachCommentData = angular.copy(vm.defaultTeachCommentData)
  if (form) {
   form.$setPristine();
   form.$setUntouched();
  }
 };
 vm.revertTeachComment = function (teachComment, teachCommentCopy) {
  teachComment = teachCommentCopy;
  /*
   $filter('filter')
   (vm.teachCommentsManager.teachComments, {id: teachCommentId}, true)[0]
   = angular.copy($filter('filter')
   (vm.teachCommentsCopy, {id: teachCommentId}, true)[0]);
   if (teachComment.length && teachCommentCopy.length) {
   // vm.teachCommentsManager.teachComments angular.copy(vm.teachCommentsCopy);
   }
   */
 };
 vm.editedComment = null;
 $scope.$watch(angular.bind(this, function () {
  return vm.teachComments;
 }), function () {
  //vm.remainingCount = filterFilter(teachComments, {completed: false}).length;
  vm.doneCount = vm.teachCommentsManager.teachComments.length - vm.remainingCount;
  vm.allChecked = !vm.remainingCount;
  //TeachCommentService.put(vm.teachComments);
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




 vm.editComment = function (teachComment) {
  vm.editedComment = teachComment;
  // Clone the original teachComment to restore it on demand.
  vm.originalComment = angular.copy(teachComment);
 };
 vm.doneEditing = function (teachComment) {
  vm.editedComment = null;
  teachComment.title = teachComment.title.trim();
  if (!teachComment.title) {
   vm.removeComment(teachComment);
  }
 };
 vm.openTeachComment = function (teachComment) {
  var modalInstance = $uibModal.open({
   animation: true,
   templateUrl: 'teach-comment-modal.html',
   controller: 'TeachCommentCtrl as teachCommentCtrl',
   backdrop: 'static',
   size: 'xl',
   resolve: {
    teachCommentData: function () {
     return teachComment;
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
 vm.teachCommentsManager.getTeachComments(vm.teachId);
};

teachCommentsCtrl.$inject = [
 'TeachCommentsManager',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$uibModal',
 '$log',
 '$filter'];

angular.module("app.teachs").controller('TeachCommentsCtrl', teachCommentsCtrl);
