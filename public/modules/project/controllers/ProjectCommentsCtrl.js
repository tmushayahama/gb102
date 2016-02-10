var projectCommentsCtrl = function (
        ProjectCommentsManager,
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
 vm.projectId = $stateParams.projectId;
 vm.projectCommentsCopy;
 vm.projectCommentsManager = new ProjectCommentsManager();
 vm.commentFormDisplay = false;
 vm.defaultProjectCommentData = {
  projectId: $stateParams.projectId,
  privacy: 0
 }
 vm.newProjectCommentData = angular.copy(vm.defaultProjectCommentData);
 vm.showCommentForm = function () {
  vm.commentFormDisplay = true;
 };
 vm.createProjectComment = function (data) {
  vm.projectCommentsManager.createProjectComment(data).then(function (response) {
   vm.commentFormDisplay = false;
   vm.newProjectCommentData = angular.copy(vm.defaultProjectCommentData);
   vm.projectCommentsCopy = angular.copy(vm.projectCommentsManager.projectComments);
  }, function (response) {
   console.log(response);
  });
 };
 vm.editProjectComment = function (data) {
  vm.projectCommentsManager.editProjectComment(data).then(function (response) {
   vm.commentFormDisplay = false;
   vm.newProjectCommentData = angular.copy(vm.defaultProjectCommentData);
   vm.projectCommentsCopy = angular.copy(vm.projectCommentsManager.projectComments);
  }, function (response) {
   console.log(response);
  });
 };
 vm.editProjectCommentSections = {
  details: function (projectCommentId, detail) {
   var projectCommentData = {
    projectCommentId: projectCommentId,
    title: detail.title,
    description: detail.description
   };
   vm.editProjectComment(projectCommentData);
  }
 }

 vm.cancelProjectComment = function (form) {
  vm.commentFormDisplay = false;
  vm.newProjectCommentData = angular.copy(vm.defaultProjectCommentData)
  if (form) {
   form.$setPristine();
   form.$setUntouched();
  }
 };
 vm.revertProjectComment = function (projectComment, projectCommentCopy) {
  projectComment = projectCommentCopy;
  /*
   $filter('filter')
   (vm.projectCommentsManager.projectComments, {id: projectCommentId}, true)[0]
   = angular.copy($filter('filter')
   (vm.projectCommentsCopy, {id: projectCommentId}, true)[0]);
   if (projectComment.length && projectCommentCopy.length) {
   // vm.projectCommentsManager.projectComments angular.copy(vm.projectCommentsCopy);
   }
   */
 };
 vm.editedComment = null;
 $scope.$watch(angular.bind(this, function () {
  return vm.projectComments;
 }), function () {
  //vm.remainingCount = filterFilter(projectComments, {completed: false}).length;
  vm.doneCount = vm.projectCommentsManager.projectComments.length - vm.remainingCount;
  vm.allChecked = !vm.remainingCount;
  //ProjectCommentService.put(vm.projectComments);
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




 vm.editComment = function (projectComment) {
  vm.editedComment = projectComment;
  // Clone the original projectComment to restore it on demand.
  vm.originalComment = angular.copy(projectComment);
 };
 vm.doneEditing = function (projectComment) {
  vm.editedComment = null;
  projectComment.title = projectComment.title.trim();
  if (!projectComment.title) {
   vm.removeComment(projectComment);
  }
 };
 vm.openProjectComment = function (projectComment) {
  var modalInstance = $uibModal.open({
   animation: true,
   templateUrl: 'project-comment-modal.html',
   controller: 'ProjectCommentCtrl as projectCommentCtrl',
   backdrop: 'static',
   size: 'xl',
   resolve: {
    projectCommentData: function () {
     return projectComment;
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
 vm.projectCommentsManager.getProjectComments(vm.projectId);
};

projectCommentsCtrl.$inject = [
 'ProjectCommentsManager',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$uibModal',
 '$log',
 '$filter'];

angular.module("app.project").controller('ProjectCommentsCtrl', projectCommentsCtrl);
