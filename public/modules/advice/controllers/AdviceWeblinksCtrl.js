var adviceWeblinksCtrl = function (
        AdviceWeblinksSrv,
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
 vm.adviceId = $stateParams.adviceId;
 vm.adviceWeblinksCopy;
 vm.adviceWeblinksSrv = new AdviceWeblinksSrv();
 vm.weblinkFormDisplay = false;

 vm.defaultAdviceWeblinkData = {
  adviceId: $stateParams.adviceId,
  privacy: 0
 }
 vm.newAdviceWeblinkData = angular.copy(vm.defaultAdviceWeblinkData);

 vm.showWeblinkForm = function () {
  vm.weblinkFormDisplay = true;
 };

 vm.createAdviceWeblink = function (data) {
  vm.adviceWeblinksSrv.createAdviceWeblink(data).then(function (response) {
   vm.weblinkFormDisplay = false;
   vm.newAdviceWeblinkData = angular.copy(vm.defaultAdviceWeblinkData);
   vm.adviceWeblinksCopy = angular.copy(vm.adviceWeblinksSrv.adviceWeblinks);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editAdviceWeblink = function (data) {
  vm.adviceWeblinksSrv.editAdviceWeblink(data).then(function (response) {
   vm.weblinkFormDisplay = false;
   vm.newAdviceWeblinkData = angular.copy(vm.defaultAdviceWeblinkData);
   vm.adviceWeblinksCopy = angular.copy(vm.adviceWeblinksSrv.adviceWeblinks);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editAdviceWeblinkSections = {
  details: function (adviceWeblinkId, detail) {
   var adviceWeblinkData = {
    adviceWeblinkId: adviceWeblinkId,
    title: detail.title,
    description: detail.description
   };
   vm.editAdviceWeblink(adviceWeblinkData);
  }
 }

 vm.cancelAdviceWeblink = function (form) {
  vm.weblinkFormDisplay = false;
  vm.newAdviceWeblinkData = angular.copy(vm.defaultAdviceWeblinkData)
  if (form) {
   form.$setPristine();
   form.$setUntouched();
  }
 };

 vm.revertAdviceWeblink = function (adviceWeblink, adviceWeblinkCopy) {
  adviceWeblink = adviceWeblinkCopy;
  /*
   $filter('filter')
   (vm.adviceWeblinksSrv.adviceWeblinks, {id: adviceWeblinkId}, true)[0]
   = angular.copy($filter('filter')
   (vm.adviceWeblinksCopy, {id: adviceWeblinkId}, true)[0]);
   if (adviceWeblink.length && adviceWeblinkCopy.length) {
   // vm.adviceWeblinksSrv.adviceWeblinks angular.copy(vm.adviceWeblinksCopy);
   }
   */
 };






 vm.editedWeblink = null;

 $scope.$watch(angular.bind(this, function () {
  return vm.adviceWeblinks;
 }), function () {
  //vm.remainingCount = filterFilter(adviceWeblinks, {completed: false}).length;
  vm.doneCount = vm.adviceWeblinksSrv.adviceWeblinks.length - vm.remainingCount;
  vm.allChecked = !vm.remainingCount;
  //AdviceWeblinkService.put(vm.adviceWeblinks);
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




 vm.editWeblink = function (adviceWeblink) {
  vm.editedWeblink = adviceWeblink;
  // Clone the original adviceWeblink to restore it on demand.
  vm.originalWeblink = angular.copy(adviceWeblink);
 };


 vm.doneEditing = function (adviceWeblink) {
  vm.editedWeblink = null;
  adviceWeblink.title = adviceWeblink.title.trim();

  if (!adviceWeblink.title) {
   vm.removeWeblink(adviceWeblink);
  }
 };

 vm.openAdviceWeblink = function (adviceWeblink) {
  var modalInstance = $uibModal.open({
   animation: true,
   templateUrl: 'advice-weblink-modal.html',
   controller: 'AdviceWeblinkCtrl as adviceWeblinkCtrl',
   backdrop: 'static',
   size: 'xl',
   resolve: {
    adviceWeblinkData: function () {
     return adviceWeblink;
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
 vm.adviceWeblinksSrv.getAdviceWeblinks(vm.adviceId);
};

adviceWeblinksCtrl.$inject = [
 'AdviceWeblinksSrv',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$uibModal',
 '$log',
 '$filter'];

angular.module("app.advice").controller('AdviceWeblinksCtrl', adviceWeblinksCtrl);
