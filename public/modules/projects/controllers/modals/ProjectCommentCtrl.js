var projectCommentCtrl = function (
        ProjectCommentManager,
        $uibModalInstance,
        $scope,
        $state,
        $stateParams,
        $http,
        $rootScope,
        $location,
        $log,
        projectCommentData) {
 var vm = this;
 vm.projectId = projectCommentData.project_id;
 vm.projectCommentId = projectCommentData.id;
 vm.projectCommentManager = new ProjectCommentManager();


 vm.commentId = projectCommentData.comment_id;

 vm.commentFormDisplay = false;




 vm.ok = function () {
  $uibModalInstance.close();
 };

 vm.close = function () {
  $uibModalInstance.dismiss('cancel');
 };

 // vm.newProjectCommentData = vm.defaultProjectCommentData;

 vm.getProjectComment = function (projectId, commentId) {
  vm.projectCommentManager.getProjectComment(projectId, commentId).then(function (response) {
  }, function (error) {
   console.log(error);
  });
 };

 vm.editProjectComment = function (data) {
  vm.projectCommentManager.editProjectComment(data).then(function (response) {
  }, function (response) {
   console.log(response);
  });
 };

 vm.editProjectCommentSections = {
  details: function (details) {
   var projectCommentData = {
    projectCommentId: vm.projectCommentId,
    title: details.title,
    description: details.description
   };
   vm.editProjectComment(projectCommentData);
  }
 }



 vm.showCommentForm = function () {
  vm.commentFormDisplay = true;
 };



 //--------init------
 vm.getProjectComment(vm.projectId, vm.commentId);
};

projectCommentCtrl.$inject = [
 'ProjectCommentManager',
 '$uibModalInstance',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$log',
 'projectCommentData'];

angular.module("app.projects").controller('ProjectCommentCtrl', projectCommentCtrl);
