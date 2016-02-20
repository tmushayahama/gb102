var exploreContributorsCtrl = function (
        ExploreContributorsManager,
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
 vm.exploreContributorsCopy;
 vm.exploreContributorsManager = new ExploreContributorsManager();
 vm.contributorFormDisplay = false;
 vm.defaultExploreContributorData = {
  exploreId: $stateParams.exploreId,
  privacy: 0
 }
 vm.newExploreContributorData = angular.copy(vm.defaultExploreContributorData);
 vm.showContributorForm = function () {
  vm.contributorFormDisplay = true;
 };
 vm.createExploreContributor = function (data) {
  vm.exploreContributorsManager.createExploreContributor(data).then(function (response) {
   vm.contributorFormDisplay = false;
   vm.newExploreContributorData = angular.copy(vm.defaultExploreContributorData);
   vm.exploreContributorsCopy = angular.copy(vm.exploreContributorsManager.exploreContributors);
  }, function (response) {
   console.log(response);
  });
 };
 vm.editExploreContributor = function (data) {
  vm.exploreContributorsManager.editExploreContributor(data).then(function (response) {
   vm.contributorFormDisplay = false;
   vm.newExploreContributorData = angular.copy(vm.defaultExploreContributorData);
   vm.exploreContributorsCopy = angular.copy(vm.exploreContributorsManager.exploreContributors);
  }, function (response) {
   console.log(response);
  });
 };
 vm.editExploreContributorSections = {
  details: function (exploreContributorId, detail) {
   var exploreContributorData = {
    exploreContributorId: exploreContributorId,
    title: detail.title,
    description: detail.description
   };
   vm.editExploreContributor(exploreContributorData);
  }
 }

 vm.cancelExploreContributor = function (form) {
  vm.contributorFormDisplay = false;
  vm.newExploreContributorData = angular.copy(vm.defaultExploreContributorData)
  if (form) {
   form.$setPristine();
   form.$setUntouched();
  }
 };
 vm.revertExploreContributor = function (exploreContributor, exploreContributorCopy) {
  exploreContributor = exploreContributorCopy;
  /*
   $filter('filter')
   (vm.exploreContributorsManager.exploreContributors, {id: exploreContributorId}, true)[0]
   = angular.copy($filter('filter')
   (vm.exploreContributorsCopy, {id: exploreContributorId}, true)[0]);
   if (exploreContributor.length && exploreContributorCopy.length) {
   // vm.exploreContributorsManager.exploreContributors angular.copy(vm.exploreContributorsCopy);
   }
   */
 };
 vm.editedContributor = null;
 $scope.$watch(angular.bind(this, function () {
  return vm.exploreContributors;
 }), function () {
  //vm.remainingCount = filterFilter(exploreContributors, {completed: false}).length;
  vm.doneCount = vm.exploreContributorsManager.exploreContributors.length - vm.remainingCount;
  vm.allChecked = !vm.remainingCount;
  //ExploreContributorService.put(vm.exploreContributors);
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




 vm.editContributor = function (exploreContributor) {
  vm.editedContributor = exploreContributor;
  // Clone the original exploreContributor to restore it on demand.
  vm.originalContributor = angular.copy(exploreContributor);
 };
 vm.doneEditing = function (exploreContributor) {
  vm.editedContributor = null;
  exploreContributor.title = exploreContributor.title.trim();
  if (!exploreContributor.title) {
   vm.removeContributor(exploreContributor);
  }
 };
 vm.openExploreContributor = function (exploreContributor) {
  var modalInstance = $uibModal.open({
   animation: true,
   templateUrl: 'explore-contributor-modal.html',
   controller: 'ExploreContributorCtrl as exploreContributorCtrl',
   backdrop: 'static',
   size: 'xl',
   resolve: {
    exploreContributorData: function () {
     return exploreContributor;
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
 vm.exploreContributorsManager.getExploreContributors(vm.exploreId);
};

exploreContributorsCtrl.$inject = [
 'ExploreContributorsManager',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$uibModal',
 '$log',
 '$filter'];

angular.module("app.explore").controller('ExploreContributorsCtrl', exploreContributorsCtrl);
