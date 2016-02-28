var collaborationCommentCtrl = function (
        CollaborationCommentSrv,
        $uibModalInstance,
        $scope,
        $state,
        $stateParams,
        $http,
        $rootScope,
        $location,
        $log,
        collaborationCommentData) {
 var vm = this;
 vm.collaborationId = collaborationCommentData.collaboration_id;
 vm.collaborationCommentId = collaborationCommentData.id;
 vm.collaborationCommentSrv = new CollaborationCommentSrv();


 vm.commentId = collaborationCommentData.comment_id;

 vm.commentFormDisplay = false;




 vm.ok = function () {
  $uibModalInstance.close();
 };

 vm.close = function () {
  $uibModalInstance.dismiss('cancel');
 };

 // vm.newCollaborationCommentData = vm.defaultCollaborationCommentData;

 vm.getCollaborationComment = function (collaborationId, commentId) {
  vm.collaborationCommentSrv.getCollaborationComment(collaborationId, commentId).then(function (response) {
  }, function (error) {
   console.log(error);
  });
 };

 vm.editCollaborationComment = function (data) {
  vm.collaborationCommentSrv.editCollaborationComment(data).then(function (response) {
  }, function (response) {
   console.log(response);
  });
 };

 vm.editCollaborationCommentSections = {
  details: function (details) {
   var collaborationCommentData = {
    collaborationCommentId: vm.collaborationCommentId,
    title: details.title,
    description: details.description
   };
   vm.editCollaborationComment(collaborationCommentData);
  }
 }



 vm.showCommentForm = function () {
  vm.commentFormDisplay = true;
 };



 //--------init------
 vm.getCollaborationComment(vm.collaborationId, vm.commentId);
};

collaborationCommentCtrl.$inject = [
 'CollaborationCommentSrv',
 '$uibModalInstance',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$log',
 'collaborationCommentData'];

angular.module("app.collaboration").controller('CollaborationCommentCtrl', collaborationCommentCtrl);
