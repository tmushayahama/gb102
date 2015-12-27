var hobbyCommentCtrl = function (
        HobbyCommentManager,
        $uibModalInstance,
        $scope,
        $state,
        $stateParams,
        $http,
        $rootScope,
        $location,
        $log,
        hobbyCommentData) {
 var vm = this;
 vm.hobbyId = hobbyCommentData.hobby_id;
 vm.hobbyCommentId = hobbyCommentData.id;
 vm.hobbyCommentManager = new HobbyCommentManager();


 vm.commentId = hobbyCommentData.comment_id;

 vm.commentFormDisplay = false;




 vm.ok = function () {
  $uibModalInstance.close();
 };

 vm.close = function () {
  $uibModalInstance.dismiss('cancel');
 };

 // vm.newHobbyCommentData = vm.defaultHobbyCommentData;

 vm.getHobbyComment = function (hobbyId, commentId) {
  vm.hobbyCommentManager.getHobbyComment(hobbyId, commentId).then(function (response) {
  }, function (error) {
   console.log(error);
  });
 };

 vm.editHobbyComment = function (data) {
  vm.hobbyCommentManager.editHobbyComment(data).then(function (response) {
  }, function (response) {
   console.log(response);
  });
 };

 vm.editHobbyCommentSections = {
  details: function (details) {
   var hobbyCommentData = {
    hobbyCommentId: vm.hobbyCommentId,
    title: details.title,
    description: details.description
   };
   vm.editHobbyComment(hobbyCommentData);
  }
 }



 vm.showCommentForm = function () {
  vm.commentFormDisplay = true;
 };



 //--------init------
 vm.getHobbyComment(vm.hobbyId, vm.commentId);
};

hobbyCommentCtrl.$inject = [
 'HobbyCommentManager',
 '$uibModalInstance',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$log',
 'hobbyCommentData'];

angular.module("app.hobbys").controller('HobbyCommentCtrl', hobbyCommentCtrl);
