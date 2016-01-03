var communityCommentCtrl = function (
        CommunityCommentManager,
        $uibModalInstance,
        $scope,
        $state,
        $stateParams,
        $http,
        $rootScope,
        $location,
        $log,
        communityCommentData) {
 var vm = this;
 vm.communityId = communityCommentData.community_id;
 vm.communityCommentId = communityCommentData.id;
 vm.communityCommentManager = new CommunityCommentManager();


 vm.commentId = communityCommentData.comment_id;

 vm.commentFormDisplay = false;




 vm.ok = function () {
  $uibModalInstance.close();
 };

 vm.close = function () {
  $uibModalInstance.dismiss('cancel');
 };

 // vm.newCommunityCommentData = vm.defaultCommunityCommentData;

 vm.getCommunityComment = function (communityId, commentId) {
  vm.communityCommentManager.getCommunityComment(communityId, commentId).then(function (response) {
  }, function (error) {
   console.log(error);
  });
 };

 vm.editCommunityComment = function (data) {
  vm.communityCommentManager.editCommunityComment(data).then(function (response) {
  }, function (response) {
   console.log(response);
  });
 };

 vm.editCommunityCommentSections = {
  details: function (details) {
   var communityCommentData = {
    communityCommentId: vm.communityCommentId,
    title: details.title,
    description: details.description
   };
   vm.editCommunityComment(communityCommentData);
  }
 }



 vm.showCommentForm = function () {
  vm.commentFormDisplay = true;
 };



 //--------init------
 vm.getCommunityComment(vm.communityId, vm.commentId);
};

communityCommentCtrl.$inject = [
 'CommunityCommentManager',
 '$uibModalInstance',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$log',
 'communityCommentData'];

angular.module("app.communitys").controller('CommunityCommentCtrl', communityCommentCtrl);
