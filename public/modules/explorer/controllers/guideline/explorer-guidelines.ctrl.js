var explorerGuidelinesCtrl = function (
        ExplorerGuidelinesSrv,
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

 $scope.card = {};
 $scope.card.title = 'test';
 vm.page = 0;
 vm.shots = [];
 vm.loadingMore = false;

 vm.loadMoreShots = function () {

  if (vm.loadingMore)
   return;
  vm.page++;
  // var deferred = $q.defer();
  vm.loadingMore = true;
  var promise = $http.get('https://api.dribbble.com/v1/shots/?per_page=24&page=' + vm.page + '&access_token=3df6bcfc60b54b131ac04f132af615e60b0bd0b1cadca89a4761cd5d125d608f');
  promise.then(function (data) {

   var shotsTmp = angular.copy(vm.shots);
   shotsTmp = shotsTmp.concat(data.data);
   vm.shots = shotsTmp;
   vm.loadingMore = false;

  }, function () {
   vm.loadingMore = false;
  });
  return promise;
 };

 vm.loadMoreShots();







 vm.explorerId = $stateParams.explorerId;
 vm.explorerGuidelines = [];
 vm.explorerGuidelinesCopy;
 vm.explorerGuidelinesSrv = new ExplorerGuidelinesSrv();
 vm.guidelineFormDisplay = false;

 vm.defaultExplorerGuidelineData = {
  explorerId: $stateParams.explorerId,
  privacy: 0
 }
 vm.newExplorerGuidelineData = angular.copy(vm.defaultExplorerGuidelineData);

 vm.showGuidelineForm = function () {
  vm.guidelineFormDisplay = true;
 };

 vm.getExplorerGuidelines = function (explorerId) {
  vm.explorerGuidelinesSrv.getExplorerGuidelines(explorerId).then(function (response) {
   vm.explorerGuidelines = response;
   angular.forEach(response, function (step, key) {
    vm.explorerGuidelinesSrv.getSubGuidelines(step.guideline.id).then(function (stepResponse) {
     vm.explorerGuidelines[key].steps = stepResponse;
    });
   });
  });
 }

 vm.createExplorerGuideline = function (data) {
  vm.explorerGuidelinesSrv.createExplorerGuideline(data).then(function (response) {
   vm.guidelineFormDisplay = false;
   vm.newExplorerGuidelineData = angular.copy(vm.defaultExplorerGuidelineData);
   vm.explorerGuidelines.unshift(response);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editExplorerGuideline = function (data) {
  vm.explorerGuidelinesSrv.editExplorerGuideline(data).then(function (response) {
   vm.guidelineFormDisplay = false;
   vm.newExplorerGuidelineData = angular.copy(vm.defaultExplorerGuidelineData);
   vm.explorerGuidelinesCopy = angular.copy(vm.explorerGuidelines);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editExplorerGuidelineSections = {
  details: function (explorerGuidelineId, detail) {
   var explorerGuidelineData = {
    explorerGuidelineId: explorerGuidelineId,
    title: detail.title,
    description: detail.description
   };
   vm.editExplorerGuideline(explorerGuidelineData);
  }
 }

 vm.cancelExplorerGuideline = function (form) {
  vm.guidelineFormDisplay = false;
  vm.newExplorerGuidelineData = angular.copy(vm.defaultExplorerGuidelineData)
  if (form) {
   form.$setPristine();
   form.$setUntouched();
  }
 };


 vm.editedGuideline = null;

 $scope.$watch(angular.bind(this, function () {
  return vm.explorerGuidelines;
 }), function () {
  //vm.remainingCount = filterFilter(explorerGuidelines, {completed: false}).length;
  vm.doneCount = vm.explorerGuidelines.length - vm.remainingCount;
  vm.allChecked = !vm.remainingCount;
  //ExplorerGuidelineService.put(vm.explorerGuidelines);
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




 vm.editGuideline = function (explorerGuideline) {
  vm.editedGuideline = explorerGuideline;
  // Clone the original explorerGuideline to restore it on demand.
  vm.originalGuideline = angular.copy(explorerGuideline);
 };


 vm.doneEditing = function (explorerGuideline) {
  vm.editedGuideline = null;
  explorerGuideline.title = explorerGuideline.title.trim();

  if (!explorerGuideline.title) {
   vm.removeGuideline(explorerGuideline);
  }
 };

 vm.openExplorerGuideline = function (explorerGuideline) {
  var modalInstance = $uibModal.open({
   animation: true,
   templateUrl: 'explorer-guideline-modal.html',
   controller: 'ExplorerGuidelineCtrl as explorerGuidelineCtrl',
   backdrop: 'static',
   size: 'xl',
   resolve: {
    explorerGuidelineData: function () {
     return explorerGuideline;
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
 vm.getExplorerGuidelines(vm.explorerId);
};


explorerGuidelinesCtrl.$inject = [
 'ExplorerGuidelinesSrv',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$uibModal',
 '$log',
 '$filter'];

angular.module("app.explorer").controller('ExplorerGuidelinesCtrl', explorerGuidelinesCtrl);
