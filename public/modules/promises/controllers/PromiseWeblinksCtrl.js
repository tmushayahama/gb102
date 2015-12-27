var promiseWeblinksCtrl = function (
        PromiseWeblinksManager,
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
 vm.promiseId = $stateParams.promiseId;
 vm.promiseWeblinksCopy;
 vm.promiseWeblinksManager = new PromiseWeblinksManager();
 vm.weblinkFormDisplay = false;

 vm.defaultPromiseWeblinkData = {
  promiseId: $stateParams.promiseId,
  privacy: 0
 }
 vm.newPromiseWeblinkData = angular.copy(vm.defaultPromiseWeblinkData);

 vm.showWeblinkForm = function () {
  vm.weblinkFormDisplay = true;
 };

 vm.createPromiseWeblink = function (data) {
  vm.promiseWeblinksManager.createPromiseWeblink(data).then(function (response) {
   vm.weblinkFormDisplay = false;
   vm.newPromiseWeblinkData = angular.copy(vm.defaultPromiseWeblinkData);
   vm.promiseWeblinksCopy = angular.copy(vm.promiseWeblinksManager.promiseWeblinks);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editPromiseWeblink = function (data) {
  vm.promiseWeblinksManager.editPromiseWeblink(data).then(function (response) {
   vm.weblinkFormDisplay = false;
   vm.newPromiseWeblinkData = angular.copy(vm.defaultPromiseWeblinkData);
   vm.promiseWeblinksCopy = angular.copy(vm.promiseWeblinksManager.promiseWeblinks);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editPromiseWeblinkSections = {
  details: function (promiseWeblinkId, detail) {
   var promiseWeblinkData = {
    promiseWeblinkId: promiseWeblinkId,
    title: detail.title,
    description: detail.description
   };
   vm.editPromiseWeblink(promiseWeblinkData);
  }
 }

 vm.cancelPromiseWeblink = function (form) {
  vm.weblinkFormDisplay = false;
  vm.newPromiseWeblinkData = angular.copy(vm.defaultPromiseWeblinkData)
  if (form) {
   form.$setPristine();
   form.$setUntouched();
  }
 };

 vm.revertPromiseWeblink = function (promiseWeblink, promiseWeblinkCopy) {
  promiseWeblink = promiseWeblinkCopy;
  /*
   $filter('filter')
   (vm.promiseWeblinksManager.promiseWeblinks, {id: promiseWeblinkId}, true)[0]
   = angular.copy($filter('filter')
   (vm.promiseWeblinksCopy, {id: promiseWeblinkId}, true)[0]);
   if (promiseWeblink.length && promiseWeblinkCopy.length) {
   // vm.promiseWeblinksManager.promiseWeblinks angular.copy(vm.promiseWeblinksCopy);
   }
   */
 };






 vm.editedWeblink = null;

 $scope.$watch(angular.bind(this, function () {
  return vm.promiseWeblinks;
 }), function () {
  //vm.remainingCount = filterFilter(promiseWeblinks, {completed: false}).length;
  vm.doneCount = vm.promiseWeblinksManager.promiseWeblinks.length - vm.remainingCount;
  vm.allChecked = !vm.remainingCount;
  //PromiseWeblinkService.put(vm.promiseWeblinks);
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




 vm.editWeblink = function (promiseWeblink) {
  vm.editedWeblink = promiseWeblink;
  // Clone the original promiseWeblink to restore it on demand.
  vm.originalWeblink = angular.copy(promiseWeblink);
 };


 vm.doneEditing = function (promiseWeblink) {
  vm.editedWeblink = null;
  promiseWeblink.title = promiseWeblink.title.trim();

  if (!promiseWeblink.title) {
   vm.removeWeblink(promiseWeblink);
  }
 };

 vm.openPromiseWeblink = function (promiseWeblink) {
  var modalInstance = $uibModal.open({
   animation: true,
   templateUrl: 'promise-weblink-modal.html',
   controller: 'PromiseWeblinkCtrl as promiseWeblinkCtrl',
   backdrop: 'static',
   size: 'xl',
   resolve: {
    promiseWeblinkData: function () {
     return promiseWeblink;
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
 vm.promiseWeblinksManager.getPromiseWeblinks(vm.promiseId);
};

promiseWeblinksCtrl.$inject = [
 'PromiseWeblinksManager',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$uibModal',
 '$log',
 '$filter'];

angular.module("app.promises").controller('PromiseWeblinksCtrl', promiseWeblinksCtrl);
