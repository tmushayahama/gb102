var explorerContributionsCtrl = function (
        level_categories,
        ConstantsSrv,
        ContributionsSrv,
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
 vm.contributionsSrv = new ContributionsSrv();
 vm.contributionFormDisplay = false;
 vm.defaultContributionData = {
  explorerId: $stateParams.explorerId,
  privacy: 0
 }
 vm.newContributionData = angular.copy(vm.defaultContributionData);
 vm.showContributionForm = function () {
  vm.contributionFormDisplay = true;
 };

 vm.createContribution = function (data) {
  vm.contributionsSrv.createContribution(data).then(function (response) {
   vm.contributionFormDisplay = false;
   vm.newContributionData = angular.copy(vm.defaultContributionData);
   vm.explorerContributionsCopy = angular.copy(vm.contributionsSrv.explorerContributions);
  }, function (response) {
   console.log(response);
  });
 };
 vm.editContribution = function (data) {
  vm.contributionsSrv.editContribution(data).then(function (response) {
   vm.contributionFormDisplay = false;
   vm.newContributionData = angular.copy(vm.defaultContributionData);
   vm.explorerContributionsCopy = angular.copy(vm.contributionsSrv.explorerContributions);
  }, function (response) {
   console.log(response);
  });
 };
 vm.editContributionSections = {
  details: function (explorerContributionId, detail) {
   var explorerContributionData = {
    explorerContributionId: explorerContributionId,
    title: detail.title,
    description: detail.description
   };
   vm.editContribution(explorerContributionData);
  }
 }

 vm.cancelContribution = function (form) {
  vm.contributionFormDisplay = false;
  vm.newContributionData = angular.copy(vm.defaultContributionData)
  if (form) {
   form.$setPristine();
   form.$setUntouched();
  }
 };
 vm.revertContribution = function (explorerContribution, explorerContributionCopy) {
  explorerContribution = explorerContributionCopy;
  /*
   $filter('filter')
   (vm.contributionsSrv.explorerContributions, {id: explorerContributionId}, true)[0]
   = angular.copy($filter('filter')
   (vm.explorerContributionsCopy, {id: explorerContributionId}, true)[0]);
   if (explorerContribution.length && explorerContributionCopy.length) {
   // vm.contributionsSrv.explorerContributions angular.copy(vm.explorerContributionsCopy);
   }
   */
 };
 vm.editedContribution = null;
 $scope.$watch(angular.bind(this, function () {
  return vm.explorerContributions;
 }), function () {
  //vm.remainingCount = filterFilter(explorerContributions, {completed: false}).length;
  vm.doneCount = vm.contributionsSrv.explorerContributions.length - vm.remainingCount;
  vm.allChecked = !vm.remainingCount;
  //ContributionService.put(vm.explorerContributions);
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
   templateUrl: 'create-contribution-modal.html',
   controller: 'CreateContributionCtrl as createContributionCtrl',
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

 vm.openContribution = function (explorerContribution) {
  var modalInstance = $uibModal.open({
   animation: true,
   templateUrl: 'contribution-modal.html',
   controller: 'ContributionCtrl as explorerContributionCtrl',
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

 vm.contributionsSrv.getContributions(vm.explorerId).then(function (data) {
  vm.explorerContributions = data;
 });
};

explorerContributionsCtrl.$inject = [
 'level_categories',
 'ConstantsSrv',
 'ContributionsSrv',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$uibModal',
 '$log',
 '$filter'];

angular.module("app.explorer").controller('ContributionsCtrl', explorerContributionsCtrl);
