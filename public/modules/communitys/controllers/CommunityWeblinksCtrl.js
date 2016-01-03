var communityWeblinksCtrl = function (
        CommunityWeblinksManager,
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
 vm.communityId = $stateParams.communityId;
 vm.communityWeblinksCopy;
 vm.communityWeblinksManager = new CommunityWeblinksManager();
 vm.weblinkFormDisplay = false;

 vm.defaultCommunityWeblinkData = {
  communityId: $stateParams.communityId,
  privacy: 0
 }
 vm.newCommunityWeblinkData = angular.copy(vm.defaultCommunityWeblinkData);

 vm.showWeblinkForm = function () {
  vm.weblinkFormDisplay = true;
 };

 vm.createCommunityWeblink = function (data) {
  vm.communityWeblinksManager.createCommunityWeblink(data).then(function (response) {
   vm.weblinkFormDisplay = false;
   vm.newCommunityWeblinkData = angular.copy(vm.defaultCommunityWeblinkData);
   vm.communityWeblinksCopy = angular.copy(vm.communityWeblinksManager.communityWeblinks);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editCommunityWeblink = function (data) {
  vm.communityWeblinksManager.editCommunityWeblink(data).then(function (response) {
   vm.weblinkFormDisplay = false;
   vm.newCommunityWeblinkData = angular.copy(vm.defaultCommunityWeblinkData);
   vm.communityWeblinksCopy = angular.copy(vm.communityWeblinksManager.communityWeblinks);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editCommunityWeblinkSections = {
  details: function (communityWeblinkId, detail) {
   var communityWeblinkData = {
    communityWeblinkId: communityWeblinkId,
    title: detail.title,
    description: detail.description
   };
   vm.editCommunityWeblink(communityWeblinkData);
  }
 }

 vm.cancelCommunityWeblink = function (form) {
  vm.weblinkFormDisplay = false;
  vm.newCommunityWeblinkData = angular.copy(vm.defaultCommunityWeblinkData)
  if (form) {
   form.$setPristine();
   form.$setUntouched();
  }
 };

 vm.revertCommunityWeblink = function (communityWeblink, communityWeblinkCopy) {
  communityWeblink = communityWeblinkCopy;
  /*
   $filter('filter')
   (vm.communityWeblinksManager.communityWeblinks, {id: communityWeblinkId}, true)[0]
   = angular.copy($filter('filter')
   (vm.communityWeblinksCopy, {id: communityWeblinkId}, true)[0]);
   if (communityWeblink.length && communityWeblinkCopy.length) {
   // vm.communityWeblinksManager.communityWeblinks angular.copy(vm.communityWeblinksCopy);
   }
   */
 };






 vm.editedWeblink = null;

 $scope.$watch(angular.bind(this, function () {
  return vm.communityWeblinks;
 }), function () {
  //vm.remainingCount = filterFilter(communityWeblinks, {completed: false}).length;
  vm.doneCount = vm.communityWeblinksManager.communityWeblinks.length - vm.remainingCount;
  vm.allChecked = !vm.remainingCount;
  //CommunityWeblinkService.put(vm.communityWeblinks);
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




 vm.editWeblink = function (communityWeblink) {
  vm.editedWeblink = communityWeblink;
  // Clone the original communityWeblink to restore it on demand.
  vm.originalWeblink = angular.copy(communityWeblink);
 };


 vm.doneEditing = function (communityWeblink) {
  vm.editedWeblink = null;
  communityWeblink.title = communityWeblink.title.trim();

  if (!communityWeblink.title) {
   vm.removeWeblink(communityWeblink);
  }
 };

 vm.openCommunityWeblink = function (communityWeblink) {
  var modalInstance = $uibModal.open({
   animation: true,
   templateUrl: 'community-weblink-modal.html',
   controller: 'CommunityWeblinkCtrl as communityWeblinkCtrl',
   backdrop: 'static',
   size: 'xl',
   resolve: {
    communityWeblinkData: function () {
     return communityWeblink;
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
 vm.communityWeblinksManager.getCommunityWeblinks(vm.communityId);
};

communityWeblinksCtrl.$inject = [
 'CommunityWeblinksManager',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$uibModal',
 '$log',
 '$filter'];

angular.module("app.communitys").controller('CommunityWeblinksCtrl', communityWeblinksCtrl);
