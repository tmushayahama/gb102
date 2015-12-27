var hobbyCommentsCtrl = function (
        HobbyCommentsManager,
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
 vm.hobbyId = $stateParams.hobbyId;
 vm.hobbyCommentsCopy;
 vm.hobbyCommentsManager = new HobbyCommentsManager();
 vm.commentFormDisplay = false;
 vm.defaultHobbyCommentData = {
  hobbyId: $stateParams.hobbyId,
  privacy: 0
 }
 vm.newHobbyCommentData = angular.copy(vm.defaultHobbyCommentData);
 vm.showCommentForm = function () {
  vm.commentFormDisplay = true;
 };
 vm.createHobbyComment = function (data) {
  vm.hobbyCommentsManager.createHobbyComment(data).then(function (response) {
   vm.commentFormDisplay = false;
   vm.newHobbyCommentData = angular.copy(vm.defaultHobbyCommentData);
   vm.hobbyCommentsCopy = angular.copy(vm.hobbyCommentsManager.hobbyComments);
  }, function (response) {
   console.log(response);
  });
 };
 vm.editHobbyComment = function (data) {
  vm.hobbyCommentsManager.editHobbyComment(data).then(function (response) {
   vm.commentFormDisplay = false;
   vm.newHobbyCommentData = angular.copy(vm.defaultHobbyCommentData);
   vm.hobbyCommentsCopy = angular.copy(vm.hobbyCommentsManager.hobbyComments);
  }, function (response) {
   console.log(response);
  });
 };
 vm.editHobbyCommentSections = {
  details: function (hobbyCommentId, detail) {
   var hobbyCommentData = {
    hobbyCommentId: hobbyCommentId,
    title: detail.title,
    description: detail.description
   };
   vm.editHobbyComment(hobbyCommentData);
  }
 }

 vm.cancelHobbyComment = function (form) {
  vm.commentFormDisplay = false;
  vm.newHobbyCommentData = angular.copy(vm.defaultHobbyCommentData)
  if (form) {
   form.$setPristine();
   form.$setUntouched();
  }
 };
 vm.revertHobbyComment = function (hobbyComment, hobbyCommentCopy) {
  hobbyComment = hobbyCommentCopy;
  /*
   $filter('filter')
   (vm.hobbyCommentsManager.hobbyComments, {id: hobbyCommentId}, true)[0]
   = angular.copy($filter('filter')
   (vm.hobbyCommentsCopy, {id: hobbyCommentId}, true)[0]);
   if (hobbyComment.length && hobbyCommentCopy.length) {
   // vm.hobbyCommentsManager.hobbyComments angular.copy(vm.hobbyCommentsCopy);
   }
   */
 };
 vm.editedComment = null;
 $scope.$watch(angular.bind(this, function () {
  return vm.hobbyComments;
 }), function () {
  //vm.remainingCount = filterFilter(hobbyComments, {completed: false}).length;
  vm.doneCount = vm.hobbyCommentsManager.hobbyComments.length - vm.remainingCount;
  vm.allChecked = !vm.remainingCount;
  //HobbyCommentService.put(vm.hobbyComments);
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




 vm.editComment = function (hobbyComment) {
  vm.editedComment = hobbyComment;
  // Clone the original hobbyComment to restore it on demand.
  vm.originalComment = angular.copy(hobbyComment);
 };
 vm.doneEditing = function (hobbyComment) {
  vm.editedComment = null;
  hobbyComment.title = hobbyComment.title.trim();
  if (!hobbyComment.title) {
   vm.removeComment(hobbyComment);
  }
 };
 vm.openHobbyComment = function (hobbyComment) {
  var modalInstance = $uibModal.open({
   animation: true,
   templateUrl: 'hobby-comment-modal.html',
   controller: 'HobbyCommentCtrl as hobbyCommentCtrl',
   backdrop: 'static',
   size: 'xl',
   resolve: {
    hobbyCommentData: function () {
     return hobbyComment;
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
 vm.hobbyCommentsManager.getHobbyComments(vm.hobbyId);
};

hobbyCommentsCtrl.$inject = [
 'HobbyCommentsManager',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$uibModal',
 '$log',
 '$filter'];

angular.module("app.hobbys").controller('HobbyCommentsCtrl', hobbyCommentsCtrl);
