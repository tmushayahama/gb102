var exploreWeblinksCtrl = function (
        ExploreWeblinksManager,
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
 vm.exploreId = $stateParams.exploreId;
 vm.exploreWeblinksCopy;
 vm.exploreWeblinksManager = new ExploreWeblinksManager();
 vm.weblinkFormDisplay = false;

 vm.defaultExploreWeblinkData = {
  exploreId: $stateParams.exploreId,
  privacy: 0
 }
 vm.newExploreWeblinkData = angular.copy(vm.defaultExploreWeblinkData);

 vm.showWeblinkForm = function () {
  vm.weblinkFormDisplay = true;
 };

 vm.createExploreWeblink = function (data) {
  vm.exploreWeblinksManager.createExploreWeblink(data).then(function (response) {
   vm.weblinkFormDisplay = false;
   vm.newExploreWeblinkData = angular.copy(vm.defaultExploreWeblinkData);
   vm.exploreWeblinksCopy = angular.copy(vm.exploreWeblinksManager.exploreWeblinks);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editExploreWeblink = function (data) {
  vm.exploreWeblinksManager.editExploreWeblink(data).then(function (response) {
   vm.weblinkFormDisplay = false;
   vm.newExploreWeblinkData = angular.copy(vm.defaultExploreWeblinkData);
   vm.exploreWeblinksCopy = angular.copy(vm.exploreWeblinksManager.exploreWeblinks);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editExploreWeblinkSections = {
  details: function (exploreWeblinkId, detail) {
   var exploreWeblinkData = {
    exploreWeblinkId: exploreWeblinkId,
    title: detail.title,
    description: detail.description
   };
   vm.editExploreWeblink(exploreWeblinkData);
  }
 }

 vm.cancelExploreWeblink = function (form) {
  vm.weblinkFormDisplay = false;
  vm.newExploreWeblinkData = angular.copy(vm.defaultExploreWeblinkData)
  if (form) {
   form.$setPristine();
   form.$setUntouched();
  }
 };

 vm.revertExploreWeblink = function (exploreWeblink, exploreWeblinkCopy) {
  exploreWeblink = exploreWeblinkCopy;
  /*
   $filter('filter')
   (vm.exploreWeblinksManager.exploreWeblinks, {id: exploreWeblinkId}, true)[0]
   = angular.copy($filter('filter')
   (vm.exploreWeblinksCopy, {id: exploreWeblinkId}, true)[0]);
   if (exploreWeblink.length && exploreWeblinkCopy.length) {
   // vm.exploreWeblinksManager.exploreWeblinks angular.copy(vm.exploreWeblinksCopy);
   }
   */
 };






 vm.editedWeblink = null;

 $scope.$watch(angular.bind(this, function () {
  return vm.exploreWeblinks;
 }), function () {
  //vm.remainingCount = filterFilter(exploreWeblinks, {completed: false}).length;
  vm.doneCount = vm.exploreWeblinksManager.exploreWeblinks.length - vm.remainingCount;
  vm.allChecked = !vm.remainingCount;
  //ExploreWeblinkService.put(vm.exploreWeblinks);
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




 vm.editWeblink = function (exploreWeblink) {
  vm.editedWeblink = exploreWeblink;
  // Clone the original exploreWeblink to restore it on demand.
  vm.originalWeblink = angular.copy(exploreWeblink);
 };


 vm.doneEditing = function (exploreWeblink) {
  vm.editedWeblink = null;
  exploreWeblink.title = exploreWeblink.title.trim();

  if (!exploreWeblink.title) {
   vm.removeWeblink(exploreWeblink);
  }
 };

 vm.openExploreWeblink = function (exploreWeblink) {
  var modalInstance = $uibModal.open({
   animation: true,
   templateUrl: 'explore-weblink-modal.html',
   controller: 'ExploreWeblinkCtrl as exploreWeblinkCtrl',
   backdrop: 'static',
   size: 'xl',
   resolve: {
    exploreWeblinkData: function () {
     return exploreWeblink;
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
 vm.exploreWeblinksManager.getExploreWeblinks(vm.exploreId);
};

exploreWeblinksCtrl.$inject = [
 'ExploreWeblinksManager',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$uibModal',
 '$log',
 '$filter'];

angular.module("app.explore").controller('ExploreWeblinksCtrl', exploreWeblinksCtrl);
