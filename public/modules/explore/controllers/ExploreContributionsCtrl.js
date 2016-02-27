var exploreContributionsCtrl = function (
        level_categories,
        ConstantsManager,
        ExploreContributionsManager,
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
 vm.exploreId = $stateParams.exploreId;
 vm.exploreContributions;
 vm.exploreContributionTypes;

 vm.exploreContributionsCopy;
 vm.constantsManager = new ConstantsManager();
 vm.exploreContributionsManager = new ExploreContributionsManager();
 vm.contributionFormDisplay = false;
 vm.defaultExploreContributionData = {
  exploreId: $stateParams.exploreId,
  privacy: 0
 }
 vm.newExploreContributionData = angular.copy(vm.defaultExploreContributionData);
 vm.showContributionForm = function () {
  vm.contributionFormDisplay = true;
 };

 vm.createExploreContribution = function (data) {
  vm.exploreContributionsManager.createExploreContribution(data).then(function (response) {
   vm.contributionFormDisplay = false;
   vm.newExploreContributionData = angular.copy(vm.defaultExploreContributionData);
   vm.exploreContributionsCopy = angular.copy(vm.exploreContributionsManager.exploreContributions);
  }, function (response) {
   console.log(response);
  });
 };
 vm.editExploreContribution = function (data) {
  vm.exploreContributionsManager.editExploreContribution(data).then(function (response) {
   vm.contributionFormDisplay = false;
   vm.newExploreContributionData = angular.copy(vm.defaultExploreContributionData);
   vm.exploreContributionsCopy = angular.copy(vm.exploreContributionsManager.exploreContributions);
  }, function (response) {
   console.log(response);
  });
 };
 vm.editExploreContributionSections = {
  details: function (exploreContributionId, detail) {
   var exploreContributionData = {
    exploreContributionId: exploreContributionId,
    title: detail.title,
    description: detail.description
   };
   vm.editExploreContribution(exploreContributionData);
  }
 }

 vm.cancelExploreContribution = function (form) {
  vm.contributionFormDisplay = false;
  vm.newExploreContributionData = angular.copy(vm.defaultExploreContributionData)
  if (form) {
   form.$setPristine();
   form.$setUntouched();
  }
 };
 vm.revertExploreContribution = function (exploreContribution, exploreContributionCopy) {
  exploreContribution = exploreContributionCopy;
  /*
   $filter('filter')
   (vm.exploreContributionsManager.exploreContributions, {id: exploreContributionId}, true)[0]
   = angular.copy($filter('filter')
   (vm.exploreContributionsCopy, {id: exploreContributionId}, true)[0]);
   if (exploreContribution.length && exploreContributionCopy.length) {
   // vm.exploreContributionsManager.exploreContributions angular.copy(vm.exploreContributionsCopy);
   }
   */
 };
 vm.editedContribution = null;
 $scope.$watch(angular.bind(this, function () {
  return vm.exploreContributions;
 }), function () {
  //vm.remainingCount = filterFilter(exploreContributions, {completed: false}).length;
  vm.doneCount = vm.exploreContributionsManager.exploreContributions.length - vm.remainingCount;
  vm.allChecked = !vm.remainingCount;
  //ExploreContributionService.put(vm.exploreContributions);
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




 vm.editContribution = function (exploreContribution) {
  vm.editedContribution = exploreContribution;
  // Clone the original exploreContribution to restore it on demand.
  vm.originalContribution = angular.copy(exploreContribution);
 };
 vm.doneEditing = function (exploreContribution) {
  vm.editedContribution = null;
  exploreContribution.title = exploreContribution.title.trim();
  if (!exploreContribution.title) {
   vm.removeContribution(exploreContribution);
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

 vm.openExploreContribution = function (exploreContribution) {
  var modalInstance = $uibModal.open({
   animation: true,
   templateUrl: 'explore-contribution-modal.html',
   controller: 'ExploreContributionCtrl as exploreContributionCtrl',
   backdrop: 'static',
   size: 'xl',
   resolve: {
    exploreContributionData: function () {
     return exploreContribution;
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
 vm.constantsManager.getLevel(level_categories.contribution_types).then(function (data) {
  vm.exploreContributionTypes = data;
 });

 vm.exploreContributionsManager.getExploreContributions(vm.exploreId).then(function (data) {
  vm.exploreContributions = data;
 });
};

exploreContributionsCtrl.$inject = [
 'level_categories',
 'ConstantsManager',
 'ExploreContributionsManager',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$uibModal',
 '$log',
 '$filter'];

angular.module("app.explore").controller('ExploreContributionsCtrl', exploreContributionsCtrl);
