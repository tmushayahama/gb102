var projectCommentsCtrl = function (
        ProjectCommentsSrv,
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
 vm.projectCommentsSrv = new ProjectCommentsSrv();
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
  vm.projectCommentsSrv.createProjectComment(data).then(function (response) {
   vm.commentFormDisplay = false;
   vm.newProjectCommentData = angular.copy(vm.defaultProjectCommentData);
   vm.projectCommentsCopy = angular.copy(vm.projectCommentsSrv.projectComments);
  }, function (response) {
   console.log(response);
  });
 };
 vm.editProjectComment = function (data) {
  vm.projectCommentsSrv.editProjectComment(data).then(function (response) {
   vm.commentFormDisplay = false;
   vm.newProjectCommentData = angular.copy(vm.defaultProjectCommentData);
   vm.projectCommentsCopy = angular.copy(vm.projectCommentsSrv.projectComments);
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
   (vm.projectCommentsSrv.projectComments, {id: projectCommentId}, true)[0]
   = angular.copy($filter('filter')
   (vm.projectCommentsCopy, {id: projectCommentId}, true)[0]);
   if (projectComment.length && projectCommentCopy.length) {
   // vm.projectCommentsSrv.projectComments angular.copy(vm.projectCommentsCopy);
   }
   */
 };
 vm.editedComment = null;
 $scope.$watch(angular.bind(this, function () {
  return vm.projectComments;
 }), function () {
  //vm.remainingCount = filterFilter(projectComments, {completed: false}).length;
  vm.doneCount = vm.projectCommentsSrv.projectComments.length - vm.remainingCount;
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
 vm.projectCommentsSrv.getProjectComments(vm.projectId);
};

projectCommentsCtrl.$inject = [
 'ProjectCommentsSrv',
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
