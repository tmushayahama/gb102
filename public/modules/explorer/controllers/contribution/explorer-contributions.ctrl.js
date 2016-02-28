var explorerContributionsCtrl = function (
        level_categories,
        ConstantsSrv,
        ExplorerContributionsSrv,
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
 vm.explorerContributions;
 vm.explorerContributionTypes;

 vm.explorerContributionsCopy;
 vm.constantsSrv = new ConstantsSrv();
 vm.explorerContributionsSrv = new ExplorerContributionsSrv();
 vm.contributionFormDisplay = false;
 vm.defaultExplorerContributionData = {
  explorerId: $stateParams.explorerId,
  privacy: 0
 }
 vm.newExplorerContributionData = angular.copy(vm.defaultExplorerContributionData);
 vm.showContributionForm = function () {
  vm.contributionFormDisplay = true;
 };

 vm.createExplorerContribution = function (data) {
  vm.explorerContributionsSrv.createExplorerContribution(data).then(function (response) {
   vm.contributionFormDisplay = false;
   vm.newExplorerContributionData = angular.copy(vm.defaultExplorerContributionData);
   vm.explorerContributionsCopy = angular.copy(vm.explorerContributionsSrv.explorerContributions);
  }, function (response) {
   console.log(response);
  });
 };
 vm.editExplorerContribution = function (data) {
  vm.explorerContributionsSrv.editExplorerContribution(data).then(function (response) {
   vm.contributionFormDisplay = false;
   vm.newExplorerContributionData = angular.copy(vm.defaultExplorerContributionData);
   vm.explorerContributionsCopy = angular.copy(vm.explorerContributionsSrv.explorerContributions);
  }, function (response) {
   console.log(response);
  });
 };
 vm.editExplorerContributionSections = {
  details: function (explorerContributionId, detail) {
   var explorerContributionData = {
    explorerContributionId: explorerContributionId,
    title: detail.title,
    description: detail.description
   };
   vm.editExplorerContribution(explorerContributionData);
  }
 }

 vm.cancelExplorerContribution = function (form) {
  vm.contributionFormDisplay = false;
  vm.newExplorerContributionData = angular.copy(vm.defaultExplorerContributionData)
  if (form) {
   form.$setPristine();
   form.$setUntouched();
  }
 };
 vm.revertExplorerContribution = function (explorerContribution, explorerContributionCopy) {
  explorerContribution = explorerContributionCopy;
  /*
   $filter('filter')
   (vm.explorerContributionsSrv.explorerContributions, {id: explorerContributionId}, true)[0]
   = angular.copy($filter('filter')
   (vm.explorerContributionsCopy, {id: explorerContributionId}, true)[0]);
   if (explorerContribution.length && explorerContributionCopy.length) {
   // vm.explorerContributionsSrv.explorerContributions angular.copy(vm.explorerContributionsCopy);
   }
   */
 };
 vm.editedContribution = null;
 $scope.$watch(angular.bind(this, function () {
  return vm.explorerContributions;
 }), function () {
  //vm.remainingCount = filterFilter(explorerContributions, {completed: false}).length;
  vm.doneCount = vm.explorerContributionsSrv.explorerContributions.length - vm.remainingCount;
  vm.allChecked = !vm.remainingCount;
  //ExplorerContributionService.put(vm.explorerContributions);
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




 vm.editContribution = function (explorerContribution) {
  vm.editedContribution = explorerContribution;
  // Clone the original explorerContribution to restore it on demand.
  vm.originalContribution = angular.copy(explorerContribution);
 };
 vm.doneEditing = function (explorerContribution) {
  vm.editedContribution = null;
  explorerContribution.title = explorerContribution.title.trim();
  if (!explorerContribution.title) {
   vm.removeContribution(explorerContribution);
  }
 };

 vm.prepareSelectUsers = function (contributionType) {
  var modalInstance = $uibModal.open({
   animation: true,
   templateUrl: 'select-users.html',
   controller: 'SelectUsersCtrl as selectUsersCtrl',
   backdrop: 'static',
   size: 'xl',
   resolve: {
    contributionType: function () {
     return contributionType;
    }
   }
  });
  modalInstance.result.then(function (selectedItem) {
   $scope.selected = selectedItem;
  }, function () {
   $log.info('Modal dismissed at: ' + new Date());
  });
 };

 vm.openExplorerContribution = function (explorerContribution) {
  var modalInstance = $uibModal.open({
   animation: true,
   templateUrl: 'explorer-contribution-modal.html',
   controller: 'ExplorerContributionCtrl as explorerContributionCtrl',
   backdrop: 'static',
   size: 'xl',
   resolve: {
    explorerContributionData: function () {
     return explorerContribution;
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
 vm.constantsSrv.getLevel(level_categories.contribution_types).then(function (data) {
  vm.explorerContributionTypes = data;
 });

 vm.explorerContributionsSrv.getExplorerContributions(vm.explorerId).then(function (data) {
  vm.explorerContributions = data;
 });
};

explorerContributionsCtrl.$inject = [
 'level_categories',
 'ConstantsSrv',
 'ExplorerContributionsSrv',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$uibModal',
 '$log',
 '$filter'];

angular.module("app.explorer").controller('ExplorerContributionsCtrl', explorerContributionsCtrl);
