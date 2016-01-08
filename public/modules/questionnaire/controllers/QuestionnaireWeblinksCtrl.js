var swipeWeblinksCtrl = function (
        SwipeWeblinksManager,
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
 vm.swipeId = $stateParams.swipeId;
 vm.swipeWeblinksCopy;
 vm.swipeWeblinksManager = new SwipeWeblinksManager();
 vm.weblinkFormDisplay = false;

 vm.defaultSwipeWeblinkData = {
  swipeId: $stateParams.swipeId,
  privacy: 0
 }
 vm.newSwipeWeblinkData = angular.copy(vm.defaultSwipeWeblinkData);

 vm.showWeblinkForm = function () {
  vm.weblinkFormDisplay = true;
 };

 vm.createSwipeWeblink = function (data) {
  vm.swipeWeblinksManager.createSwipeWeblink(data).then(function (response) {
   vm.weblinkFormDisplay = false;
   vm.newSwipeWeblinkData = angular.copy(vm.defaultSwipeWeblinkData);
   vm.swipeWeblinksCopy = angular.copy(vm.swipeWeblinksManager.swipeWeblinks);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editSwipeWeblink = function (data) {
  vm.swipeWeblinksManager.editSwipeWeblink(data).then(function (response) {
   vm.weblinkFormDisplay = false;
   vm.newSwipeWeblinkData = angular.copy(vm.defaultSwipeWeblinkData);
   vm.swipeWeblinksCopy = angular.copy(vm.swipeWeblinksManager.swipeWeblinks);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editSwipeWeblinkSections = {
  details: function (swipeWeblinkId, detail) {
   var swipeWeblinkData = {
    swipeWeblinkId: swipeWeblinkId,
    title: detail.title,
    description: detail.description
   };
   vm.editSwipeWeblink(swipeWeblinkData);
  }
 }

 vm.cancelSwipeWeblink = function (form) {
  vm.weblinkFormDisplay = false;
  vm.newSwipeWeblinkData = angular.copy(vm.defaultSwipeWeblinkData)
  if (form) {
   form.$setPristine();
   form.$setUntouched();
  }
 };

 vm.revertSwipeWeblink = function (swipeWeblink, swipeWeblinkCopy) {
  swipeWeblink = swipeWeblinkCopy;
  /*
   $filter('filter')
   (vm.swipeWeblinksManager.swipeWeblinks, {id: swipeWeblinkId}, true)[0]
   = angular.copy($filter('filter')
   (vm.swipeWeblinksCopy, {id: swipeWeblinkId}, true)[0]);
   if (swipeWeblink.length && swipeWeblinkCopy.length) {
   // vm.swipeWeblinksManager.swipeWeblinks angular.copy(vm.swipeWeblinksCopy);
   }
   */
 };






 vm.editedWeblink = null;

 $scope.$watch(angular.bind(this, function () {
  return vm.swipeWeblinks;
 }), function () {
  //vm.remainingCount = filterFilter(swipeWeblinks, {completed: false}).length;
  vm.doneCount = vm.swipeWeblinksManager.swipeWeblinks.length - vm.remainingCount;
  vm.allChecked = !vm.remainingCount;
  //SwipeWeblinkService.put(vm.swipeWeblinks);
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




 vm.editWeblink = function (swipeWeblink) {
  vm.editedWeblink = swipeWeblink;
  // Clone the original swipeWeblink to restore it on demand.
  vm.originalWeblink = angular.copy(swipeWeblink);
 };


 vm.doneEditing = function (swipeWeblink) {
  vm.editedWeblink = null;
  swipeWeblink.title = swipeWeblink.title.trim();

  if (!swipeWeblink.title) {
   vm.removeWeblink(swipeWeblink);
  }
 };

 vm.openSwipeWeblink = function (swipeWeblink) {
  var modalInstance = $uibModal.open({
   animation: true,
   templateUrl: 'swipe-weblink-modal.html',
   controller: 'SwipeWeblinkCtrl as swipeWeblinkCtrl',
   backdrop: 'static',
   size: 'xl',
   resolve: {
    swipeWeblinkData: function () {
     return swipeWeblink;
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
 vm.swipeWeblinksManager.getSwipeWeblinks(vm.swipeId);
};

swipeWeblinksCtrl.$inject = [
 'SwipeWeblinksManager',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$uibModal',
 '$log',
 '$filter'];

angular.module("app.swipe").controller('SwipeWeblinksCtrl', swipeWeblinksCtrl);
