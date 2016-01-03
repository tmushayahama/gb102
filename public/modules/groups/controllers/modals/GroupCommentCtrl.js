var groupCommentCtrl = function (
        GroupCommentManager,
        $uibModalInstance,
        $scope,
        $state,
        $stateParams,
        $http,
        $rootScope,
        $location,
        $log,
        groupCommentData) {
 var vm = this;
 vm.groupId = groupCommentData.group_id;
 vm.groupCommentId = groupCommentData.id;
 vm.groupCommentManager = new GroupCommentManager();


 vm.commentId = groupCommentData.comment_id;

 vm.commentFormDisplay = false;




 vm.ok = function () {
  $uibModalInstance.close();
 };

 vm.close = function () {
  $uibModalInstance.dismiss('cancel');
 };

 // vm.newGroupCommentData = vm.defaultGroupCommentData;

 vm.getGroupComment = function (groupId, commentId) {
  vm.groupCommentManager.getGroupComment(groupId, commentId).then(function (response) {
  }, function (error) {
   console.log(error);
  });
 };

 vm.editGroupComment = function (data) {
  vm.groupCommentManager.editGroupComment(data).then(function (response) {
  }, function (response) {
   console.log(response);
  });
 };

 vm.editGroupCommentSections = {
  details: function (details) {
   var groupCommentData = {
    groupCommentId: vm.groupCommentId,
    title: details.title,
    description: details.description
   };
   vm.editGroupComment(groupCommentData);
  }
 }



 vm.showCommentForm = function () {
  vm.commentFormDisplay = true;
 };



 //--------init------
 vm.getGroupComment(vm.groupId, vm.commentId);
};

groupCommentCtrl.$inject = [
 'GroupCommentManager',
 '$uibModalInstance',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$log',
 'groupCommentData'];

angular.module("app.groups").controller('GroupCommentCtrl', groupCommentCtrl);
