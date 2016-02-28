var teachWeblinksCtrl = function (
        TeachWeblinksSrv,
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
 vm.teachId = $stateParams.teachId;
 vm.teachWeblinksCopy;
 vm.teachWeblinksSrv = new TeachWeblinksSrv();
 vm.weblinkFormDisplay = false;

 vm.defaultTeachWeblinkData = {
  teachId: $stateParams.teachId,
  privacy: 0
 }
 vm.newTeachWeblinkData = angular.copy(vm.defaultTeachWeblinkData);

 vm.showWeblinkForm = function () {
  vm.weblinkFormDisplay = true;
 };

 vm.createTeachWeblink = function (data) {
  vm.teachWeblinksSrv.createTeachWeblink(data).then(function (response) {
   vm.weblinkFormDisplay = false;
   vm.newTeachWeblinkData = angular.copy(vm.defaultTeachWeblinkData);
   vm.teachWeblinksCopy = angular.copy(vm.teachWeblinksSrv.teachWeblinks);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editTeachWeblink = function (data) {
  vm.teachWeblinksSrv.editTeachWeblink(data).then(function (response) {
   vm.weblinkFormDisplay = false;
   vm.newTeachWeblinkData = angular.copy(vm.defaultTeachWeblinkData);
   vm.teachWeblinksCopy = angular.copy(vm.teachWeblinksSrv.teachWeblinks);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editTeachWeblinkSections = {
  details: function (teachWeblinkId, detail) {
   var teachWeblinkData = {
    teachWeblinkId: teachWeblinkId,
    title: detail.title,
    description: detail.description
   };
   vm.editTeachWeblink(teachWeblinkData);
  }
 }

 vm.cancelTeachWeblink = function (form) {
  vm.weblinkFormDisplay = false;
  vm.newTeachWeblinkData = angular.copy(vm.defaultTeachWeblinkData)
  if (form) {
   form.$setPristine();
   form.$setUntouched();
  }
 };

 vm.revertTeachWeblink = function (teachWeblink, teachWeblinkCopy) {
  teachWeblink = teachWeblinkCopy;
  /*
   $filter('filter')
   (vm.teachWeblinksSrv.teachWeblinks, {id: teachWeblinkId}, true)[0]
   = angular.copy($filter('filter')
   (vm.teachWeblinksCopy, {id: teachWeblinkId}, true)[0]);
   if (teachWeblink.length && teachWeblinkCopy.length) {
   // vm.teachWeblinksSrv.teachWeblinks angular.copy(vm.teachWeblinksCopy);
   }
   */
 };






 vm.editedWeblink = null;

 $scope.$watch(angular.bind(this, function () {
  return vm.teachWeblinks;
 }), function () {
  //vm.remainingCount = filterFilter(teachWeblinks, {completed: false}).length;
  vm.doneCount = vm.teachWeblinksSrv.teachWeblinks.length - vm.remainingCount;
  vm.allChecked = !vm.remainingCount;
  //TeachWeblinkService.put(vm.teachWeblinks);
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




 vm.editWeblink = function (teachWeblink) {
  vm.editedWeblink = teachWeblink;
  // Clone the original teachWeblink to restore it on demand.
  vm.originalWeblink = angular.copy(teachWeblink);
 };


 vm.doneEditing = function (teachWeblink) {
  vm.editedWeblink = null;
  teachWeblink.title = teachWeblink.title.trim();

  if (!teachWeblink.title) {
   vm.removeWeblink(teachWeblink);
  }
 };

 vm.openTeachWeblink = function (teachWeblink) {
  var modalInstance = $uibModal.open({
   animation: true,
   templateUrl: 'teach-weblink-modal.html',
   controller: 'TeachWeblinkCtrl as teachWeblinkCtrl',
   backdrop: 'static',
   size: 'xl',
   resolve: {
    teachWeblinkData: function () {
     return teachWeblink;
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
 vm.teachWeblinksSrv.getTeachWeblinks(vm.teachId);
};

teachWeblinksCtrl.$inject = [
 'TeachWeblinksSrv',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$uibModal',
 '$log',
 '$filter'];

angular.module("app.teach").controller('TeachWeblinksCtrl', teachWeblinksCtrl);
