var groupWeblinksCtrl = function (
        GroupWeblinksManager,
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
 vm.groupId = $stateParams.groupId;
 vm.groupWeblinksCopy;
 vm.groupWeblinksManager = new GroupWeblinksManager();
 vm.weblinkFormDisplay = false;

 vm.defaultGroupWeblinkData = {
  groupId: $stateParams.groupId,
  privacy: 0
 }
 vm.newGroupWeblinkData = angular.copy(vm.defaultGroupWeblinkData);

 vm.showWeblinkForm = function () {
  vm.weblinkFormDisplay = true;
 };

 vm.createGroupWeblink = function (data) {
  vm.groupWeblinksManager.createGroupWeblink(data).then(function (response) {
   vm.weblinkFormDisplay = false;
   vm.newGroupWeblinkData = angular.copy(vm.defaultGroupWeblinkData);
   vm.groupWeblinksCopy = angular.copy(vm.groupWeblinksManager.groupWeblinks);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editGroupWeblink = function (data) {
  vm.groupWeblinksManager.editGroupWeblink(data).then(function (response) {
   vm.weblinkFormDisplay = false;
   vm.newGroupWeblinkData = angular.copy(vm.defaultGroupWeblinkData);
   vm.groupWeblinksCopy = angular.copy(vm.groupWeblinksManager.groupWeblinks);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editGroupWeblinkSections = {
  details: function (groupWeblinkId, detail) {
   var groupWeblinkData = {
    groupWeblinkId: groupWeblinkId,
    title: detail.title,
    description: detail.description
   };
   vm.editGroupWeblink(groupWeblinkData);
  }
 }

 vm.cancelGroupWeblink = function (form) {
  vm.weblinkFormDisplay = false;
  vm.newGroupWeblinkData = angular.copy(vm.defaultGroupWeblinkData)
  if (form) {
   form.$setPristine();
   form.$setUntouched();
  }
 };

 vm.revertGroupWeblink = function (groupWeblink, groupWeblinkCopy) {
  groupWeblink = groupWeblinkCopy;
  /*
   $filter('filter')
   (vm.groupWeblinksManager.groupWeblinks, {id: groupWeblinkId}, true)[0]
   = angular.copy($filter('filter')
   (vm.groupWeblinksCopy, {id: groupWeblinkId}, true)[0]);
   if (groupWeblink.length && groupWeblinkCopy.length) {
   // vm.groupWeblinksManager.groupWeblinks angular.copy(vm.groupWeblinksCopy);
   }
   */
 };






 vm.editedWeblink = null;

 $scope.$watch(angular.bind(this, function () {
  return vm.groupWeblinks;
 }), function () {
  //vm.remainingCount = filterFilter(groupWeblinks, {completed: false}).length;
  vm.doneCount = vm.groupWeblinksManager.groupWeblinks.length - vm.remainingCount;
  vm.allChecked = !vm.remainingCount;
  //GroupWeblinkService.put(vm.groupWeblinks);
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




 vm.editWeblink = function (groupWeblink) {
  vm.editedWeblink = groupWeblink;
  // Clone the original groupWeblink to restore it on demand.
  vm.originalWeblink = angular.copy(groupWeblink);
 };


 vm.doneEditing = function (groupWeblink) {
  vm.editedWeblink = null;
  groupWeblink.title = groupWeblink.title.trim();

  if (!groupWeblink.title) {
   vm.removeWeblink(groupWeblink);
  }
 };

 vm.openGroupWeblink = function (groupWeblink) {
  var modalInstance = $uibModal.open({
   animation: true,
   templateUrl: 'group-weblink-modal.html',
   controller: 'GroupWeblinkCtrl as groupWeblinkCtrl',
   backdrop: 'static',
   size: 'xl',
   resolve: {
    groupWeblinkData: function () {
     return groupWeblink;
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
 vm.groupWeblinksManager.getGroupWeblinks(vm.groupId);
};

groupWeblinksCtrl.$inject = [
 'GroupWeblinksManager',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$uibModal',
 '$log',
 '$filter'];

angular.module("app.groups").controller('GroupWeblinksCtrl', groupWeblinksCtrl);
