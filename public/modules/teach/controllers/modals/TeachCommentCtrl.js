var teachCommentCtrl = function (
        TeachCommentManager,
        $uibModalInstance,
        $scope,
        $state,
        $stateParams,
        $http,
        $rootScope,
        $location,
        $log,
        teachCommentData) {
 var vm = this;
 vm.teachId = teachCommentData.teach_id;
 vm.teachCommentId = teachCommentData.id;
 vm.teachCommentManager = new TeachCommentManager();


 vm.commentId = teachCommentData.comment_id;

 vm.commentFormDisplay = false;




 vm.ok = function () {
  $uibModalInstance.close();
 };

 vm.close = function () {
  $uibModalInstance.dismiss('cancel');
 };

 // vm.newTeachCommentData = vm.defaultTeachCommentData;

 vm.getTeachComment = function (teachId, commentId) {
  vm.teachCommentManager.getTeachComment(teachId, commentId).then(function (response) {
  }, function (error) {
   console.log(error);
  });
 };

 vm.editTeachComment = function (data) {
  vm.teachCommentManager.editTeachComment(data).then(function (response) {
  }, function (response) {
   console.log(response);
  });
 };

 vm.editTeachCommentSections = {
  details: function (details) {
   var teachCommentData = {
    teachCommentId: vm.teachCommentId,
    title: details.title,
    description: details.description
   };
   vm.editTeachComment(teachCommentData);
  }
 }



 vm.showCommentForm = function () {
  vm.commentFormDisplay = true;
 };



 //--------init------
 vm.getTeachComment(vm.teachId, vm.commentId);
};

teachCommentCtrl.$inject = [
 'TeachCommentManager',
 '$uibModalInstance',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$log',
 'teachCommentData'];

angular.module("app.teach").controller('TeachCommentCtrl', teachCommentCtrl);
