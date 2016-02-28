var adviceCommentsCtrl = function (
        AdviceCommentsSrv,
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
 vm.adviceId = $stateParams.adviceId;
 vm.adviceCommentsCopy;
 vm.adviceCommentsSrv = new AdviceCommentsSrv();
 vm.commentFormDisplay = false;
 vm.defaultAdviceCommentData = {
  adviceId: $stateParams.adviceId,
  privacy: 0
 }
 vm.newAdviceCommentData = angular.copy(vm.defaultAdviceCommentData);
 vm.showCommentForm = function () {
  vm.commentFormDisplay = true;
 };
 vm.createAdviceComment = function (data) {
  vm.adviceCommentsSrv.createAdviceComment(data).then(function (response) {
   vm.commentFormDisplay = false;
   vm.newAdviceCommentData = angular.copy(vm.defaultAdviceCommentData);
   vm.adviceCommentsCopy = angular.copy(vm.adviceCommentsSrv.adviceComments);
  }, function (response) {
   console.log(response);
  });
 };
 vm.editAdviceComment = function (data) {
  vm.adviceCommentsSrv.editAdviceComment(data).then(function (response) {
   vm.commentFormDisplay = false;
   vm.newAdviceCommentData = angular.copy(vm.defaultAdviceCommentData);
   vm.adviceCommentsCopy = angular.copy(vm.adviceCommentsSrv.adviceComments);
  }, function (response) {
   console.log(response);
  });
 };
 vm.editAdviceCommentSections = {
  details: function (adviceCommentId, detail) {
   var adviceCommentData = {
    adviceCommentId: adviceCommentId,
    title: detail.title,
    description: detail.description
   };
   vm.editAdviceComment(adviceCommentData);
  }
 }

 vm.cancelAdviceComment = function (form) {
  vm.commentFormDisplay = false;
  vm.newAdviceCommentData = angular.copy(vm.defaultAdviceCommentData)
  if (form) {
   form.$setPristine();
   form.$setUntouched();
  }
 };
 vm.revertAdviceComment = function (adviceComment, adviceCommentCopy) {
  adviceComment = adviceCommentCopy;
  /*
   $filter('filter')
   (vm.adviceCommentsSrv.adviceComments, {id: adviceCommentId}, true)[0]
   = angular.copy($filter('filter')
   (vm.adviceCommentsCopy, {id: adviceCommentId}, true)[0]);
   if (adviceComment.length && adviceCommentCopy.length) {
   // vm.adviceCommentsSrv.adviceComments angular.copy(vm.adviceCommentsCopy);
   }
   */
 };
 vm.editedComment = null;
 $scope.$watch(angular.bind(this, function () {
  return vm.adviceComments;
 }), function () {
  //vm.remainingCount = filterFilter(adviceComments, {completed: false}).length;
  vm.doneCount = vm.adviceCommentsSrv.adviceComments.length - vm.remainingCount;
  vm.allChecked = !vm.remainingCount;
  //AdviceCommentService.put(vm.adviceComments);
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




 vm.editComment = function (adviceComment) {
  vm.editedComment = adviceComment;
  // Clone the original adviceComment to restore it on demand.
  vm.originalComment = angular.copy(adviceComment);
 };
 vm.doneEditing = function (adviceComment) {
  vm.editedComment = null;
  adviceComment.title = adviceComment.title.trim();
  if (!adviceComment.title) {
   vm.removeComment(adviceComment);
  }
 };
 vm.openAdviceComment = function (adviceComment) {
  var modalInstance = $uibModal.open({
   animation: true,
   templateUrl: 'advice-comment-modal.html',
   controller: 'AdviceCommentCtrl as adviceCommentCtrl',
   backdrop: 'static',
   size: 'xl',
   resolve: {
    adviceCommentData: function () {
     return adviceComment;
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
 vm.adviceCommentsSrv.getAdviceComments(vm.adviceId);
};

adviceCommentsCtrl.$inject = [
 'AdviceCommentsSrv',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$uibModal',
 '$log',
 '$filter'];

angular.module("app.advice").controller('AdviceCommentsCtrl', adviceCommentsCtrl);
