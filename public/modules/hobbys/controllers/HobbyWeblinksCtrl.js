var hobbyWeblinksCtrl = function (
        HobbyWeblinksManager,
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
 vm.hobbyId = $stateParams.hobbyId;
 vm.hobbyWeblinksCopy;
 vm.hobbyWeblinksManager = new HobbyWeblinksManager();
 vm.weblinkFormDisplay = false;

 vm.defaultHobbyWeblinkData = {
  hobbyId: $stateParams.hobbyId,
  privacy: 0
 }
 vm.newHobbyWeblinkData = angular.copy(vm.defaultHobbyWeblinkData);

 vm.showWeblinkForm = function () {
  vm.weblinkFormDisplay = true;
 };

 vm.createHobbyWeblink = function (data) {
  vm.hobbyWeblinksManager.createHobbyWeblink(data).then(function (response) {
   vm.weblinkFormDisplay = false;
   vm.newHobbyWeblinkData = angular.copy(vm.defaultHobbyWeblinkData);
   vm.hobbyWeblinksCopy = angular.copy(vm.hobbyWeblinksManager.hobbyWeblinks);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editHobbyWeblink = function (data) {
  vm.hobbyWeblinksManager.editHobbyWeblink(data).then(function (response) {
   vm.weblinkFormDisplay = false;
   vm.newHobbyWeblinkData = angular.copy(vm.defaultHobbyWeblinkData);
   vm.hobbyWeblinksCopy = angular.copy(vm.hobbyWeblinksManager.hobbyWeblinks);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editHobbyWeblinkSections = {
  details: function (hobbyWeblinkId, detail) {
   var hobbyWeblinkData = {
    hobbyWeblinkId: hobbyWeblinkId,
    title: detail.title,
    description: detail.description
   };
   vm.editHobbyWeblink(hobbyWeblinkData);
  }
 }

 vm.cancelHobbyWeblink = function (form) {
  vm.weblinkFormDisplay = false;
  vm.newHobbyWeblinkData = angular.copy(vm.defaultHobbyWeblinkData)
  if (form) {
   form.$setPristine();
   form.$setUntouched();
  }
 };

 vm.revertHobbyWeblink = function (hobbyWeblink, hobbyWeblinkCopy) {
  hobbyWeblink = hobbyWeblinkCopy;
  /*
   $filter('filter')
   (vm.hobbyWeblinksManager.hobbyWeblinks, {id: hobbyWeblinkId}, true)[0]
   = angular.copy($filter('filter')
   (vm.hobbyWeblinksCopy, {id: hobbyWeblinkId}, true)[0]);
   if (hobbyWeblink.length && hobbyWeblinkCopy.length) {
   // vm.hobbyWeblinksManager.hobbyWeblinks angular.copy(vm.hobbyWeblinksCopy);
   }
   */
 };






 vm.editedWeblink = null;

 $scope.$watch(angular.bind(this, function () {
  return vm.hobbyWeblinks;
 }), function () {
  //vm.remainingCount = filterFilter(hobbyWeblinks, {completed: false}).length;
  vm.doneCount = vm.hobbyWeblinksManager.hobbyWeblinks.length - vm.remainingCount;
  vm.allChecked = !vm.remainingCount;
  //HobbyWeblinkService.put(vm.hobbyWeblinks);
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




 vm.editWeblink = function (hobbyWeblink) {
  vm.editedWeblink = hobbyWeblink;
  // Clone the original hobbyWeblink to restore it on demand.
  vm.originalWeblink = angular.copy(hobbyWeblink);
 };


 vm.doneEditing = function (hobbyWeblink) {
  vm.editedWeblink = null;
  hobbyWeblink.title = hobbyWeblink.title.trim();

  if (!hobbyWeblink.title) {
   vm.removeWeblink(hobbyWeblink);
  }
 };

 vm.openHobbyWeblink = function (hobbyWeblink) {
  var modalInstance = $uibModal.open({
   animation: true,
   templateUrl: 'hobby-weblink-modal.html',
   controller: 'HobbyWeblinkCtrl as hobbyWeblinkCtrl',
   backdrop: 'static',
   size: 'xl',
   resolve: {
    hobbyWeblinkData: function () {
     return hobbyWeblink;
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
 vm.hobbyWeblinksManager.getHobbyWeblinks(vm.hobbyId);
};

hobbyWeblinksCtrl.$inject = [
 'HobbyWeblinksManager',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$uibModal',
 '$log',
 '$filter'];

angular.module("app.hobbys").controller('HobbyWeblinksCtrl', hobbyWeblinksCtrl);
