var explorerCommentCtrl = function (
        ExplorerCommentSrv,
        $uibModalInstance,
        $scope,
        $state,
        $stateParams,
        $http,
        $rootScope,
        $location,
        $log,
        explorerCommentData) {
 var vm = this;
 vm.explorerId = explorerCommentData.explorer_id;
 vm.explorerCommentId = explorerCommentData.id;
 vm.explorerCommentSrv = new ExplorerCommentSrv();


 vm.commentId = explorerCommentData.comment_id;

 vm.commentFormDisplay = false;




 vm.ok = function () {
  $uibModalInstance.close();
 };

 vm.close = function () {
  $uibModalInstance.dismiss('cancel');
 };

 // vm.newExplorerCommentData = vm.defaultExplorerCommentData;

 vm.getExplorerComment = function (explorerId, commentId) {
  vm.explorerCommentSrv.getExplorerComment(explorerId, commentId).then(function (response) {
  }, function (error) {
   console.log(error);
  });
 };

 vm.editExplorerComment = function (data) {
  vm.explorerCommentSrv.editExplorerComment(data).then(function (response) {
  }, function (response) {
   console.log(response);
  });
 };

 vm.editExplorerCommentSections = {
  details: function (details) {
   var explorerCommentData = {
    explorerCommentId: vm.explorerCommentId,
    title: details.title,
    description: details.description
   };
   vm.editExplorerComment(explorerCommentData);
  }
 }



 vm.showCommentForm = function () {
  vm.commentFormDisplay = true;
 };



 //--------init------
 vm.getExplorerComment(vm.explorerId, vm.commentId);
};

explorerCommentCtrl.$inject = [
 'ExplorerCommentSrv',
 '$uibModalInstance',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$log',
 'explorerCommentData'];

angular.module("app.explorer").controller('ExplorerCommentCtrl', explorerCommentCtrl);
