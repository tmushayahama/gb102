var explorerPlansCtrl = function (
        ExplorerPlansSrv,
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
 vm.explorerPlansCopy;
 vm.explorerPlansSrv = new ExplorerPlansSrv();
 vm.planFormDisplay = false;

 vm.defaultExplorerPlanData = {
  explorerId: $stateParams.explorerId,
  privacy: 0
 }
 vm.newExplorerPlanData = angular.copy(vm.defaultExplorerPlanData);

 vm.showPlanForm = function () {
  vm.planFormDisplay = true;
 };

 vm.createExplorerPlan = function (data) {
  vm.explorerPlansSrv.createExplorerPlan(data).then(function (response) {
   vm.planFormDisplay = false;
   vm.newExplorerPlanData = angular.copy(vm.defaultExplorerPlanData);
   vm.explorerPlansCopy = angular.copy(vm.explorerPlansSrv.explorerPlans);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editExplorerPlan = function (data) {
  vm.explorerPlansSrv.editExplorerPlan(data).then(function (response) {
   vm.planFormDisplay = false;
   vm.newExplorerPlanData = angular.copy(vm.defaultExplorerPlanData);
   vm.explorerPlansCopy = angular.copy(vm.explorerPlansSrv.explorerPlans);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editExplorerPlanSections = {
  details: function (explorerPlanId, detail) {
   var explorerPlanData = {
    explorerPlanId: explorerPlanId,
    title: detail.title,
    description: detail.description
   };
   vm.editExplorerPlan(explorerPlanData);
  }
 }

 vm.cancelExplorerPlan = function (form) {
  vm.planFormDisplay = false;
  vm.newExplorerPlanData = angular.copy(vm.defaultExplorerPlanData)
  if (form) {
   form.$setPristine();
   form.$setUntouched();
  }
 };

 vm.revertExplorerPlan = function (explorerPlan, explorerPlanCopy) {
  explorerPlan = explorerPlanCopy;
  /*
   $filter('filter')
   (vm.explorerPlansSrv.explorerPlans, {id: explorerPlanId}, true)[0]
   = angular.copy($filter('filter')
   (vm.explorerPlansCopy, {id: explorerPlanId}, true)[0]);
   if (explorerPlan.length && explorerPlanCopy.length) {
   // vm.explorerPlansSrv.explorerPlans angular.copy(vm.explorerPlansCopy);
   }
   */
 };






 vm.editedPlan = null;

 $scope.$watch(angular.bind(this, function () {
  return vm.explorerPlans;
 }), function () {
  //vm.remainingCount = filterFilter(explorerPlans, {completed: false}).length;
  vm.doneCount = vm.explorerPlansSrv.explorerPlans.length - vm.remainingCount;
  vm.allChecked = !vm.remainingCount;
  //ExplorerPlanService.put(vm.explorerPlans);
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




 vm.editPlan = function (explorerPlan) {
  vm.editedPlan = explorerPlan;
  // Clone the original explorerPlan to restore it on demand.
  vm.originalPlan = angular.copy(explorerPlan);
 };


 vm.doneEditing = function (explorerPlan) {
  vm.editedPlan = null;
  explorerPlan.title = explorerPlan.title.trim();

  if (!explorerPlan.title) {
   vm.removePlan(explorerPlan);
  }
 };

 vm.openExplorerPlan = function (explorerPlan) {
  var modalInstance = $uibModal.open({
   animation: true,
   templateUrl: 'explorer-plan-modal.html',
   controller: 'ExplorerPlanCtrl as explorerPlanCtrl',
   backdrop: 'static',
   size: 'xl',
   resolve: {
    explorerPlanData: function () {
     return explorerPlan;
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
 vm.explorerPlansSrv.getExplorerPlans(vm.explorerId);
};


explorerPlansCtrl.$inject = [
 'ExplorerPlansSrv',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$uibModal',
 '$log',
 '$filter'];

angular.module("app.explorer").controller('ExplorerPlansCtrl', explorerPlansCtrl);
