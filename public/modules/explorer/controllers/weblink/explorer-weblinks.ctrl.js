var explorerWeblinksCtrl = function (
        ExplorerWeblinksSrv,
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
 vm.explorerWeblinksCopy;
 vm.explorerWeblinksSrv = new ExplorerWeblinksSrv();
 vm.weblinkFormDisplay = false;

 vm.defaultExplorerWeblinkData = {
  explorerId: $stateParams.explorerId,
  privacy: 0
 }
 vm.newExplorerWeblinkData = angular.copy(vm.defaultExplorerWeblinkData);

 vm.showWeblinkForm = function () {
  vm.weblinkFormDisplay = true;
 };

 vm.createExplorerWeblink = function (data) {
  vm.explorerWeblinksSrv.createExplorerWeblink(data).then(function (response) {
   vm.weblinkFormDisplay = false;
   vm.newExplorerWeblinkData = angular.copy(vm.defaultExplorerWeblinkData);
   vm.explorerWeblinksCopy = angular.copy(vm.explorerWeblinksSrv.explorerWeblinks);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editExplorerWeblink = function (data) {
  vm.explorerWeblinksSrv.editExplorerWeblink(data).then(function (response) {
   vm.weblinkFormDisplay = false;
   vm.newExplorerWeblinkData = angular.copy(vm.defaultExplorerWeblinkData);
   vm.explorerWeblinksCopy = angular.copy(vm.explorerWeblinksSrv.explorerWeblinks);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editExplorerWeblinkSections = {
  details: function (explorerWeblinkId, detail) {
   var explorerWeblinkData = {
    explorerWeblinkId: explorerWeblinkId,
    title: detail.title,
    description: detail.description
   };
   vm.editExplorerWeblink(explorerWeblinkData);
  }
 }

 vm.cancelExplorerWeblink = function (form) {
  vm.weblinkFormDisplay = false;
  vm.newExplorerWeblinkData = angular.copy(vm.defaultExplorerWeblinkData)
  if (form) {
   form.$setPristine();
   form.$setUntouched();
  }
 };

 vm.revertExplorerWeblink = function (explorerWeblink, explorerWeblinkCopy) {
  explorerWeblink = explorerWeblinkCopy;
  /*
   $filter('filter')
   (vm.explorerWeblinksSrv.explorerWeblinks, {id: explorerWeblinkId}, true)[0]
   = angular.copy($filter('filter')
   (vm.explorerWeblinksCopy, {id: explorerWeblinkId}, true)[0]);
   if (explorerWeblink.length && explorerWeblinkCopy.length) {
   // vm.explorerWeblinksSrv.explorerWeblinks angular.copy(vm.explorerWeblinksCopy);
   }
   */
 };






 vm.editedWeblink = null;

 $scope.$watch(angular.bind(this, function () {
  return vm.explorerWeblinks;
 }), function () {
  //vm.remainingCount = filterFilter(explorerWeblinks, {completed: false}).length;
  vm.doneCount = vm.explorerWeblinksSrv.explorerWeblinks.length - vm.remainingCount;
  vm.allChecked = !vm.remainingCount;
  //ExplorerWeblinkService.put(vm.explorerWeblinks);
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




 vm.editWeblink = function (explorerWeblink) {
  vm.editedWeblink = explorerWeblink;
  // Clone the original explorerWeblink to restore it on demand.
  vm.originalWeblink = angular.copy(explorerWeblink);
 };


 vm.doneEditing = function (explorerWeblink) {
  vm.editedWeblink = null;
  explorerWeblink.title = explorerWeblink.title.trim();

  if (!explorerWeblink.title) {
   vm.removeWeblink(explorerWeblink);
  }
 };

 vm.openExplorerWeblink = function (explorerWeblink) {
  var modalInstance = $uibModal.open({
   animation: true,
   templateUrl: 'explorer-weblink-modal.html',
   controller: 'ExplorerWeblinkCtrl as explorerWeblinkCtrl',
   backdrop: 'static',
   size: 'xl',
   resolve: {
    explorerWeblinkData: function () {
     return explorerWeblink;
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
 vm.explorerWeblinksSrv.getExplorerWeblinks(vm.explorerId);
};

explorerWeblinksCtrl.$inject = [
 'ExplorerWeblinksSrv',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$uibModal',
 '$log',
 '$filter'];

angular.module("app.explorer").controller('ExplorerWeblinksCtrl', explorerWeblinksCtrl);
