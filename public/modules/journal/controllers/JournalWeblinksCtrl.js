var journalWeblinksCtrl = function (
        JournalWeblinksManager,
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
 vm.journalWeblinksCopy;
 vm.journalWeblinksManager = new JournalWeblinksManager();
 vm.weblinkFormDisplay = false;

 vm.defaultJournalWeblinkData = {
  journalId: $stateParams.journalId,
  privacy: 0
 }
 vm.newJournalWeblinkData = angular.copy(vm.defaultJournalWeblinkData);

 vm.showWeblinkForm = function () {
  vm.weblinkFormDisplay = true;
 };

 vm.createJournalWeblink = function (data) {
  vm.journalWeblinksManager.createJournalWeblink(data).then(function (response) {
   vm.weblinkFormDisplay = false;
   vm.newJournalWeblinkData = angular.copy(vm.defaultJournalWeblinkData);
   vm.journalWeblinksCopy = angular.copy(vm.journalWeblinksManager.journalWeblinks);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editJournalWeblink = function (data) {
  vm.journalWeblinksManager.editJournalWeblink(data).then(function (response) {
   vm.weblinkFormDisplay = false;
   vm.newJournalWeblinkData = angular.copy(vm.defaultJournalWeblinkData);
   vm.journalWeblinksCopy = angular.copy(vm.journalWeblinksManager.journalWeblinks);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editJournalWeblinkSections = {
  details: function (journalWeblinkId, detail) {
   var journalWeblinkData = {
    journalWeblinkId: journalWeblinkId,
    title: detail.title,
    description: detail.description
   };
   vm.editJournalWeblink(journalWeblinkData);
  }
 }

 vm.cancelJournalWeblink = function (form) {
  vm.weblinkFormDisplay = false;
  vm.newJournalWeblinkData = angular.copy(vm.defaultJournalWeblinkData)
  if (form) {
   form.$setPristine();
   form.$setUntouched();
  }
 };

 vm.revertJournalWeblink = function (journalWeblink, journalWeblinkCopy) {
  journalWeblink = journalWeblinkCopy;
  /*
   $filter('filter')
   (vm.journalWeblinksManager.journalWeblinks, {id: journalWeblinkId}, true)[0]
   = angular.copy($filter('filter')
   (vm.journalWeblinksCopy, {id: journalWeblinkId}, true)[0]);
   if (journalWeblink.length && journalWeblinkCopy.length) {
   // vm.journalWeblinksManager.journalWeblinks angular.copy(vm.journalWeblinksCopy);
   }
   */
 };






 vm.editedWeblink = null;

 $scope.$watch(angular.bind(this, function () {
  return vm.journalWeblinks;
 }), function () {
  //vm.remainingCount = filterFilter(journalWeblinks, {completed: false}).length;
  vm.doneCount = vm.journalWeblinksManager.journalWeblinks.length - vm.remainingCount;
  vm.allChecked = !vm.remainingCount;
  //JournalWeblinkService.put(vm.journalWeblinks);
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




 vm.editWeblink = function (journalWeblink) {
  vm.editedWeblink = journalWeblink;
  // Clone the original journalWeblink to restore it on demand.
  vm.originalWeblink = angular.copy(journalWeblink);
 };


 vm.doneEditing = function (journalWeblink) {
  vm.editedWeblink = null;
  journalWeblink.title = journalWeblink.title.trim();

  if (!journalWeblink.title) {
   vm.removeWeblink(journalWeblink);
  }
 };

 vm.openJournalWeblink = function (journalWeblink) {
  var modalInstance = $uibModal.open({
   animation: true,
   templateUrl: 'journal-weblink-modal.html',
   controller: 'JournalWeblinkCtrl as journalWeblinkCtrl',
   backdrop: 'static',
   size: 'xl',
   resolve: {
    journalWeblinkData: function () {
     return journalWeblink;
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
 vm.journalWeblinksManager.getJournalWeblinks(vm.journalId);
};

journalWeblinksCtrl.$inject = [
 'JournalWeblinksManager',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$uibModal',
 '$log',
 '$filter'];

angular.module("app.journal").controller('JournalWeblinksCtrl', journalWeblinksCtrl);
