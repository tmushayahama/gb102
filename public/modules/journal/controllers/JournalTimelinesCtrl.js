var journalProgressCtrl = function (
        JournalProgressSrv,
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
 vm.journalId = $stateParams.journalId;
 vm.journalProgressCopy;
 vm.journalProgressSrv = new JournalProgressSrv();
 vm.progressFormDisplay = false;

 vm.defaultJournalProgressData = {
  journalId: $stateParams.journalId,
  privacy: 0
 }
 vm.newJournalProgressData = angular.copy(vm.defaultJournalProgressData);

 vm.showProgressForm = function () {
  vm.progressFormDisplay = true;
 };

 vm.createJournalProgress = function (data) {
  vm.journalProgressSrv.createJournalProgress(data).then(function (response) {
   vm.progressFormDisplay = false;
   vm.newJournalProgressData = angular.copy(vm.defaultJournalProgressData);
   vm.journalProgressCopy = angular.copy(vm.journalProgressSrv.journalProgress);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editJournalProgress = function (data) {
  vm.journalProgressSrv.editJournalProgress(data).then(function (response) {
   vm.progressFormDisplay = false;
   vm.newJournalProgressData = angular.copy(vm.defaultJournalProgressData);
   vm.journalProgressCopy = angular.copy(vm.journalProgressSrv.journalProgress);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editJournalProgressSections = {
  details: function (journalProgressId, detail) {
   var journalProgressData = {
    journalProgressId: journalProgressId,
    title: detail.title,
    description: detail.description
   };
   vm.editJournalProgress(journalProgressData);
  }
 }

 vm.cancelJournalProgress = function (form) {
  vm.progressFormDisplay = false;
  vm.newJournalProgressData = angular.copy(vm.defaultJournalProgressData)
  if (form) {
   form.$setPristine();
   form.$setUntouched();
  }
 };

 vm.revertJournalProgress = function (journalProgress, journalProgressCopy) {
  journalProgress = journalProgressCopy;
  /*
   $filter('filter')
   (vm.journalProgressSrv.journalProgress, {id: journalProgressId}, true)[0]
   = angular.copy($filter('filter')
   (vm.journalProgressCopy, {id: journalProgressId}, true)[0]);
   if (journalProgress.length && journalProgressCopy.length) {
   // vm.journalProgressSrv.journalProgress angular.copy(vm.journalProgressCopy);
   }
   */
 };






 vm.editedProgress = null;

 $scope.$watch(angular.bind(this, function () {
  return vm.journalProgress;
 }), function () {
  //vm.remainingCount = filterFilter(journalProgress, {completed: false}).length;
  vm.doneCount = vm.journalProgressSrv.journalProgress.length - vm.remainingCount;
  vm.allChecked = !vm.remainingCount;
  //JournalProgressService.put(vm.journalProgress);
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




 vm.editProgress = function (journalProgress) {
  vm.editedProgress = journalProgress;
  // Clone the original journalProgress to restore it on demand.
  vm.originalProgress = angular.copy(journalProgress);
 };


 vm.doneEditing = function (journalProgress) {
  vm.editedProgress = null;
  journalProgress.title = journalProgress.title.trim();

  if (!journalProgress.title) {
   vm.removeProgress(journalProgress);
  }
 };

 vm.openJournalProgress = function (journalProgress) {
  var modalInstance = $uibModal.open({
   animation: true,
   templateUrl: 'journal-progress-modal.html',
   controller: 'JournalProgressCtrl as journalProgressCtrl',
   backdrop: 'static',
   size: 'xl',
   resolve: {
    journalProgressData: function () {
     return journalProgress;
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
 vm.journalProgressSrv.getJournalProgress(vm.journalId);
};

journalProgressCtrl.$inject = [
 'JournalProgressSrv',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$uibModal',
 '$log',
 '$filter'];

angular.module("app.journal").controller('JournalProgressCtrl', journalProgressCtrl);
