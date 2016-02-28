var explorerCommentsCtrl = function (
        ExplorerCommentsSrv,
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
 vm.explorerId = $stateParams.explorerId;
 vm.explorerCommentsCopy;
 vm.explorerCommentsSrv = new ExplorerCommentsSrv();
 vm.commentFormDisplay = false;
 vm.defaultExplorerCommentData = {
  explorerId: $stateParams.explorerId,
  privacy: 0
 }
 vm.newExplorerCommentData = angular.copy(vm.defaultExplorerCommentData);
 vm.showCommentForm = function () {
  vm.commentFormDisplay = true;
 };
 vm.createExplorerComment = function (data) {
  vm.explorerCommentsSrv.createExplorerComment(data).then(function (response) {
   vm.commentFormDisplay = false;
   vm.newExplorerCommentData = angular.copy(vm.defaultExplorerCommentData);
   vm.explorerCommentsCopy = angular.copy(vm.explorerCommentsSrv.explorerComments);
  }, function (response) {
   console.log(response);
  });
 };
 vm.editExplorerComment = function (data) {
  vm.explorerCommentsSrv.editExplorerComment(data).then(function (response) {
   vm.commentFormDisplay = false;
   vm.newExplorerCommentData = angular.copy(vm.defaultExplorerCommentData);
   vm.explorerCommentsCopy = angular.copy(vm.explorerCommentsSrv.explorerComments);
  }, function (response) {
   console.log(response);
  });
 };
 vm.editExplorerCommentSections = {
  details: function (explorerCommentId, detail) {
   var explorerCommentData = {
    explorerCommentId: explorerCommentId,
    title: detail.title,
    description: detail.description
   };
   vm.editExplorerComment(explorerCommentData);
  }
 }

 vm.cancelExplorerComment = function (form) {
  vm.commentFormDisplay = false;
  vm.newExplorerCommentData = angular.copy(vm.defaultExplorerCommentData)
  if (form) {
   form.$setPristine();
   form.$setUntouched();
  }
 };
 vm.revertExplorerComment = function (explorerComment, explorerCommentCopy) {
  explorerComment = explorerCommentCopy;
  /*
   $filter('filter')
   (vm.explorerCommentsSrv.explorerComments, {id: explorerCommentId}, true)[0]
   = angular.copy($filter('filter')
   (vm.explorerCommentsCopy, {id: explorerCommentId}, true)[0]);
   if (explorerComment.length && explorerCommentCopy.length) {
   // vm.explorerCommentsSrv.explorerComments angular.copy(vm.explorerCommentsCopy);
   }
   */
 };
 vm.editedComment = null;
 $scope.$watch(angular.bind(this, function () {
  return vm.explorerComments;
 }), function () {
  //vm.remainingCount = filterFilter(explorerComments, {completed: false}).length;
  vm.doneCount = vm.explorerCommentsSrv.explorerComments.length - vm.remainingCount;
  vm.allChecked = !vm.remainingCount;
  //ExplorerCommentService.put(vm.explorerComments);
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




 vm.editComment = function (explorerComment) {
  vm.editedComment = explorerComment;
  // Clone the original explorerComment to restore it on demand.
  vm.originalComment = angular.copy(explorerComment);
 };
 vm.doneEditing = function (explorerComment) {
  vm.editedComment = null;
  explorerComment.title = explorerComment.title.trim();
  if (!explorerComment.title) {
   vm.removeComment(explorerComment);
  }
 };
 vm.openExplorerComment = function (explorerComment) {
  var modalInstance = $uibModal.open({
   animation: true,
   templateUrl: 'explorer-comment-modal.html',
   controller: 'ExplorerCommentCtrl as explorerCommentCtrl',
   backdrop: 'static',
   size: 'xl',
   resolve: {
    explorerCommentData: function () {
     return explorerComment;
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
 vm.explorerCommentsSrv.getExplorerComments(vm.explorerId);
};

explorerCommentsCtrl.$inject = [
 'ExplorerCommentsSrv',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$uibModal',
 '$log',
 '$filter'];

angular.module("app.explorer").controller('ExplorerCommentsCtrl', explorerCommentsCtrl);
