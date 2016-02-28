
var explorersCtrl = function (
        level_categories,
        ConstantsSrv,
        SearchSrv,
        ExplorersSrv,
        $scope,
        $state,
        $stateParams,
        $http,
        $rootScope,
        $location,
        $uibModal,
        $log,
        $filter,
        $css) {

 var vm = this;

 $css.bind({
  href: 'public/css/gb-sass/stylesheets/gb-themes/app-theme-explorer.css'
 }, $scope);

 vm.explorersSrv = new ExplorersSrv();
 vm.constantsSrv = new ConstantsSrv();
 $rootScope.appName = 'EXPLORER';
 vm.explorerLevels;
 vm.appTypes;


 vm.createExplorer = function (data) {
  vm.explorersSrv.createExplorer(data).then(function (response) {
   vm.FormDisplay = false;
   vm.newExplorerData = angular.copy(vm.defaultExplorerData);
   vm.explorersCopy = angular.copy(vm.explorersSrv.explorers);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editExplorer = function (data) {
  vm.explorersSrv.editExplorer(data).then(function (response) {
   vm.FormDisplay = false;
   vm.newExplorerData = angular.copy(vm.defaultExplorerData);
   vm.explorersCopy = angular.copy(vm.explorersSrv.explorers);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editExplorerSections = {
  details: function (explorerId, detail) {
   var explorerData = {
    explorerId: explorerId,
    title: detail.title,
    description: detail.description
   };
   vm.editExplorer(explorerData);
  }
 }

 vm.cancelExplorer = function (form) {
  vm.FormDisplay = false;
  vm.newExplorerData = angular.copy(vm.defaultExplorerData)
  if (form) {
   form.$setPristine();
   form.$setUntouched();
  }
 };

 vm.revertExplorer = function (explorer, explorerCopy) {
  explorer = explorerCopy;
  /*
   $filter('filter')
   (vm.explorersSrv.explorers, {id: explorerId}, true)[0]
   = angular.copy($filter('filter')
   (vm.explorersCopy, {id: explorerId}, true)[0]);
   if (explorer.length && explorerCopy.length) {
   // vm.explorersSrv.explorers angular.copy(vm.explorersCopy);
   }
   */
 };

 $scope.$watch(angular.bind(this, function () {
  return vm.explorers;
 }), function () {
  //vm.remainingCount = filterFilter(explorers, {completed: false}).length;
  vm.doneCount = vm.explorersSrv.explorers.length - vm.remainingCount;
  vm.allChecked = !vm.remainingCount;
  //ExplorerService.put(vm.explorers);
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




 vm.edit = function (explorer) {
  vm.edited = explorer;
  // Clone the original explorer to restore it on demand.
  vm.original = angular.copy(explorer);
 };


 vm.doneEditing = function (explorer) {
  vm.edited = null;
  explorer.title = explorer.title.trim();

  if (!explorer.title) {
   vm.remove(explorer);
  }
 };

 $rootScope.openAddExplorerModal = function () {
  var modalInstance = $uibModal.open({
   animation: true,
   templateUrl: 'add-explorer-modal.html',
   controller: 'AddExplorerCtrl as addExplorerCtrl',
   backdrop: 'static',
   size: 'xl',
   resolve: {
    appTypes: function () {
     return vm.appTypes;
    }
   }
  });

  modalInstance.result.then(function (explorer) {
   vm.explorersSrv.createExplorer(explorer);
  }, function () {
   $log.info('Modal dismissed at: ' + new Date());
  });
 };

 $rootScope.openCreateRequestExplorerModal = function (explorerId) {
  var modalInstance = $uibModal.open({
   animation: true,
   templateUrl: 'add-request-explorer-modal.html',
   controller: 'CreateRequestExplorerCtrl as createRequestExplorerCtrl',
   backdrop: 'static',
   size: 'xl',
   resolve: {
    requestOptions: function () {
     return vm.explorersSrv.getExplorerRequestOptions(explorerId);
    }
   }
  });

  modalInstance.result.then(function (explorer) {
   vm.explorersSrv.createExplorer(explorer);
  }, function () {
   $log.info('Modal dismissed at: ' + new Date());
  });
 };

 //--------init------
 vm.constantsSrv.getAppTypes().then(function (data) {
  vm.appTypes = data;
 });
 vm.constantsSrv.getLevel(level_categories.explorer).then(function (data) {
  vm.explorerLevels = data;
 });
};

explorersCtrl.$inject = [
 'level_categories',
 'ConstantsSrv',
 'SearchSrv',
 'ExplorersSrv',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$uibModal',
 '$log',
 '$filter',
 '$css'];

angular.module("app.explorer").controller('ExplorersCtrl', explorersCtrl);