var exploreCommentCtrl = function (
        ExploreCommentManager,
        $uibModalInstance,
        $scope,
        $state,
        $stateParams,
        $http,
        $rootScope,
        $location,
        $log,
        exploreCommentData) {
 var vm = this;
 vm.exploreId = exploreCommentData.explore_id;
 vm.exploreCommentId = exploreCommentData.id;
 vm.exploreCommentManager = new ExploreCommentManager();


 vm.commentId = exploreCommentData.comment_id;

 vm.commentFormDisplay = false;




 vm.ok = function () {
  $uibModalInstance.close();
 };

 vm.close = function () {
  $uibModalInstance.dismiss('cancel');
 };

 // vm.newExploreCommentData = vm.defaultExploreCommentData;

 vm.getExploreComment = function (exploreId, commentId) {
  vm.exploreCommentManager.getExploreComment(exploreId, commentId).then(function (response) {
  }, function (error) {
   console.log(error);
  });
 };

 vm.editExploreComment = function (data) {
  vm.exploreCommentManager.editExploreComment(data).then(function (response) {
  }, function (response) {
   console.log(response);
  });
 };

 vm.editExploreCommentSections = {
  details: function (details) {
   var exploreCommentData = {
    exploreCommentId: vm.exploreCommentId,
    title: details.title,
    description: details.description
   };
   vm.editExploreComment(exploreCommentData);
  }
 }



 vm.showCommentForm = function () {
  vm.commentFormDisplay = true;
 };



 //--------init------
 vm.getExploreComment(vm.exploreId, vm.commentId);
};

exploreCommentCtrl.$inject = [
 'ExploreCommentManager',
 '$uibModalInstance',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$log',
 'exploreCommentData'];

angular.module("app.explore").controller('ExploreCommentCtrl', exploreCommentCtrl);
