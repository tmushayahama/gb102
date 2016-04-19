var explorerDiscussionsCtrl = function (
        ExplorerDiscussionsSrv,
        $scope,
        $state,
        $stateParams,
        $http,
        $rootScope,
        $location,
        $uibModal,
        $log,
        $filter) {

 var vm = this;
 vm.explorerId = $stateParams.explorerId;
 vm.explorerDiscussionsCopy;
 vm.explorerDiscussionsSrv = new ExplorerDiscussionsSrv();
 vm.discussionFormDisplay = false;
 vm.defaultExplorerDiscussionData = {
  explorerId: $stateParams.explorerId,
  privacy: 0
 }
 vm.newExplorerDiscussionData = angular.copy(vm.defaultExplorerDiscussionData);
 vm.showDiscussionForm = function () {
  vm.discussionFormDisplay = true;
 };
 vm.createExplorerDiscussion = function (data) {
  vm.explorerDiscussionsSrv.createExplorerDiscussion(data).then(function (response) {
   vm.discussionFormDisplay = false;
   vm.newExplorerDiscussionData = angular.copy(vm.defaultExplorerDiscussionData);
   vm.explorerDiscussionsCopy = angular.copy(vm.explorerDiscussionsSrv.explorerDiscussions);
  }, function (response) {
   console.log(response);
  });
 };
 vm.editExplorerDiscussion = function (data) {
  vm.explorerDiscussionsSrv.editExplorerDiscussion(data).then(function (response) {
   vm.discussionFormDisplay = false;
   vm.newExplorerDiscussionData = angular.copy(vm.defaultExplorerDiscussionData);
   vm.explorerDiscussionsCopy = angular.copy(vm.explorerDiscussionsSrv.explorerDiscussions);
  }, function (response) {
   console.log(response);
  });
 };
 vm.editExplorerDiscussionSections = {
  details: function (explorerDiscussionId, detail) {
   var explorerDiscussionData = {
    explorerDiscussionId: explorerDiscussionId,
    title: detail.title,
    description: detail.description
   };
   vm.editExplorerDiscussion(explorerDiscussionData);
  }
 }

 vm.cancelExplorerDiscussion = function (form) {
  vm.discussionFormDisplay = false;
  vm.newExplorerDiscussionData = angular.copy(vm.defaultExplorerDiscussionData)
  if (form) {
   form.$setPristine();
   form.$setUntouched();
  }
 };
 vm.revertExplorerDiscussion = function (explorerDiscussion, explorerDiscussionCopy) {
  explorerDiscussion = explorerDiscussionCopy;
  /*
   $filter('filter')
   (vm.explorerDiscussionsSrv.explorerDiscussions, {id: explorerDiscussionId}, true)[0]
   = angular.copy($filter('filter')
   (vm.explorerDiscussionsCopy, {id: explorerDiscussionId}, true)[0]);
   if (explorerDiscussion.length && explorerDiscussionCopy.length) {
   // vm.explorerDiscussionsSrv.explorerDiscussions angular.copy(vm.explorerDiscussionsCopy);
   }
   */
 };
 vm.editedDiscussion = null;
 $scope.$watch(angular.bind(this, function () {
  return vm.explorerDiscussions;
 }), function () {
  //vm.remainingCount = filterFilter(explorerDiscussions, {completed: false}).length;
  vm.doneCount = vm.explorerDiscussionsSrv.explorerDiscussions.length - vm.remainingCount;
  vm.allChecked = !vm.remainingCount;
  //ExplorerDiscussionService.put(vm.explorerDiscussions);
 }, true);
 /*
  $scope.$watch(angular.bind(this, function () {
  return vm.location.path();
  }), function (path) {
  vm.statusFilter = (path === '/active') ?
  {completed: false} : (path === '/completed') ?
  {completed: true} : null;
  });
  */




 vm.editDiscussion = function (explorerDiscussion) {
  vm.editedDiscussion = explorerDiscussion;
  // Clone the original explorerDiscussion to restore it on demand.
  vm.originalDiscussion = angular.copy(explorerDiscussion);
 };
 vm.doneEditing = function (explorerDiscussion) {
  vm.editedDiscussion = null;
  explorerDiscussion.title = explorerDiscussion.title.trim();
  if (!explorerDiscussion.title) {
   vm.removeDiscussion(explorerDiscussion);
  }
 };
 vm.openExplorerDiscussion = function (explorerDiscussion) {
  var modalInstance = $uibModal.open({
   animation: true,
   templateUrl: 'explorer-discussion-modal.html',
   controller: 'ExplorerDiscussionCtrl as explorerDiscussionCtrl',
   backdrop: 'static',
   size: 'xl',
   resolve: {
    explorerDiscussionData: function () {
     return explorerDiscussion;
    }
   }
  });
  modalInstance.result.then(function (selectedItem) {
   $scope.selected = selectedItem;
  }, function () {
   $log.info('Modal dismissed at: ' + new Date());
  });
 };
 //--------init------
 vm.explorerDiscussionsSrv.getExplorerDiscussions(vm.explorerId);
};

explorerDiscussionsCtrl.$inject = [
 'ExplorerDiscussionsSrv',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$uibModal',
 '$log',
 '$filter'];

angular.module("app.explorer").controller('ExplorerDiscussionsCtrl', explorerDiscussionsCtrl);
