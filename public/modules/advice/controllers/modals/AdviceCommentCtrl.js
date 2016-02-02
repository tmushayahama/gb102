var adviceCommentCtrl = function (
        AdviceCommentManager,
        $uibModalInstance,
        $scope,
        $state,
        $stateParams,
        $http,
        $rootScope,
        $location,
        $log,
        adviceCommentData) {
 var vm = this;
 vm.adviceId = adviceCommentData.advice_id;
 vm.adviceCommentId = adviceCommentData.id;
 vm.adviceCommentManager = new AdviceCommentManager();


 vm.commentId = adviceCommentData.comment_id;

 vm.commentFormDisplay = false;




 vm.ok = function () {
  $uibModalInstance.close();
 };

 vm.close = function () {
  $uibModalInstance.dismiss('cancel');
 };

 // vm.newAdviceCommentData = vm.defaultAdviceCommentData;

 vm.getAdviceComment = function (adviceId, commentId) {
  vm.adviceCommentManager.getAdviceComment(adviceId, commentId).then(function (response) {
  }, function (error) {
   console.log(error);
  });
 };

 vm.editAdviceComment = function (data) {
  vm.adviceCommentManager.editAdviceComment(data).then(function (response) {
  }, function (response) {
   console.log(response);
  });
 };

 vm.editAdviceCommentSections = {
  details: function (details) {
   var adviceCommentData = {
    adviceCommentId: vm.adviceCommentId,
    title: details.title,
    description: details.description
   };
   vm.editAdviceComment(adviceCommentData);
  }
 }



 vm.showCommentForm = function () {
  vm.commentFormDisplay = true;
 };



 //--------init------
 vm.getAdviceComment(vm.adviceId, vm.commentId);
};

adviceCommentCtrl.$inject = [
 'AdviceCommentManager',
 '$uibModalInstance',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$log',
 'adviceCommentData'];

angular.module("app.advice").controller('AdviceCommentCtrl', adviceCommentCtrl);
