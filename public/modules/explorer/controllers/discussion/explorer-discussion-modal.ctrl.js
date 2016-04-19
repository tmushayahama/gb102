var explorerDiscussionCtrl = function (
        ExplorerDiscussionSrv,
        $uibModalInstance,
        $scope,
        $state,
        $stateParams,
        $http,
        $rootScope,
        $location,
        $log,
        explorerDiscussionData) {
 var vm = this;
 vm.explorerId = explorerDiscussionData.explorer_id;
 vm.explorerDiscussionId = explorerDiscussionData.id;
 vm.explorerDiscussionSrv = new ExplorerDiscussionSrv();


 vm.discussionId = explorerDiscussionData.discussion_id;

 vm.discussionFormDisplay = false;




 vm.ok = function () {
  $uibModalInstance.close();
 };

 vm.close = function () {
  $uibModalInstance.dismiss('cancel');
 };

 // vm.newExplorerDiscussionData = vm.defaultExplorerDiscussionData;

 vm.getExplorerDiscussion = function (explorerId, discussionId) {
  vm.explorerDiscussionSrv.getExplorerDiscussion(explorerId, discussionId).then(function (response) {
  }, function (error) {
   console.log(error);
  });
 };

 vm.editExplorerDiscussion = function (data) {
  vm.explorerDiscussionSrv.editExplorerDiscussion(data).then(function (response) {
  }, function (response) {
   console.log(response);
  });
 };

 vm.editExplorerDiscussionSections = {
  details: function (details) {
   var explorerDiscussionData = {
    explorerDiscussionId: vm.explorerDiscussionId,
    title: details.title,
    description: details.description
   };
   vm.editExplorerDiscussion(explorerDiscussionData);
  }
 }



 vm.showDiscussionForm = function () {
  vm.discussionFormDisplay = true;
 };



 //--------init------
 vm.getExplorerDiscussion(vm.explorerId, vm.discussionId);
};

explorerDiscussionCtrl.$inject = [
 'ExplorerDiscussionSrv',
 '$uibModalInstance',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$log',
 'explorerDiscussionData'];

angular.module("app.explorer").controller('ExplorerDiscussionCtrl', explorerDiscussionCtrl);
