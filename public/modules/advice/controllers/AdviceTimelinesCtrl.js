var adviceProgressCtrl = function (
        AdviceProgressSrv,
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
 vm.adviceProgressCopy;
 vm.adviceProgressSrv = new AdviceProgressSrv();
 vm.progressFormDisplay = false;

 vm.defaultAdviceProgressData = {
  adviceId: $stateParams.adviceId,
  privacy: 0
 }
 vm.newAdviceProgressData = angular.copy(vm.defaultAdviceProgressData);

 vm.showProgressForm = function () {
  vm.progressFormDisplay = true;
 };

 vm.createAdviceProgress = function (data) {
  vm.adviceProgressSrv.createAdviceProgress(data).then(function (response) {
   vm.progressFormDisplay = false;
   vm.newAdviceProgressData = angular.copy(vm.defaultAdviceProgressData);
   vm.adviceProgressCopy = angular.copy(vm.adviceProgressSrv.adviceProgress);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editAdviceProgress = function (data) {
  vm.adviceProgressSrv.editAdviceProgress(data).then(function (response) {
   vm.progressFormDisplay = false;
   vm.newAdviceProgressData = angular.copy(vm.defaultAdviceProgressData);
   vm.adviceProgressCopy = angular.copy(vm.adviceProgressSrv.adviceProgress);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editAdviceProgressSections = {
  details: function (adviceProgressId, detail) {
   var adviceProgressData = {
    adviceProgressId: adviceProgressId,
    title: detail.title,
    description: detail.description
   };
   vm.editAdviceProgress(adviceProgressData);
  }
 }

 vm.cancelAdviceProgress = function (form) {
  vm.progressFormDisplay = false;
  vm.newAdviceProgressData = angular.copy(vm.defaultAdviceProgressData)
  if (form) {
   form.$setPristine();
   form.$setUntouched();
  }
 };

 vm.revertAdviceProgress = function (adviceProgress, adviceProgressCopy) {
  adviceProgress = adviceProgressCopy;
  /*
   $filter('filter')
   (vm.adviceProgressSrv.adviceProgress, {id: adviceProgressId}, true)[0]
   = angular.copy($filter('filter')
   (vm.adviceProgressCopy, {id: adviceProgressId}, true)[0]);
   if (adviceProgress.length && adviceProgressCopy.length) {
   // vm.adviceProgressSrv.adviceProgress angular.copy(vm.adviceProgressCopy);
   }
   */
 };






 vm.editedProgress = null;

 $scope.$watch(angular.bind(this, function () {
  return vm.adviceProgress;
 }), function () {
  //vm.remainingCount = filterFilter(adviceProgress, {completed: false}).length;
  vm.doneCount = vm.adviceProgressSrv.adviceProgress.length - vm.remainingCount;
  vm.allChecked = !vm.remainingCount;
  //AdviceProgressService.put(vm.adviceProgress);
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




 vm.editProgress = function (adviceProgress) {
  vm.editedProgress = adviceProgress;
  // Clone the original adviceProgress to restore it on demand.
  vm.originalProgress = angular.copy(adviceProgress);
 };


 vm.doneEditing = function (adviceProgress) {
  vm.editedProgress = null;
  adviceProgress.title = adviceProgress.title.trim();

  if (!adviceProgress.title) {
   vm.removeProgress(adviceProgress);
  }
 };

 vm.openAdviceProgress = function (adviceProgress) {
  var modalInstance = $uibModal.open({
   animation: true,
   templateUrl: 'advice-progress-modal.html',
   controller: 'AdviceProgressCtrl as adviceProgressCtrl',
   backdrop: 'static',
   size: 'xl',
   resolve: {
    adviceProgressData: function () {
     return adviceProgress;
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
 vm.adviceProgressSrv.getAdviceProgress(vm.adviceId);
};

adviceProgressCtrl.$inject = [
 'AdviceProgressSrv',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$uibModal',
 '$log',
 '$filter'];

angular.module("app.advice").controller('AdviceProgressCtrl', adviceProgressCtrl);
