
var exploresCtrl = function (
        level_categories,
        ConstantsManager,
        SearchManager,
        ExploresManager,
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
  href: 'public/css/gb-sass/stylesheets/gb-themes/app-theme-explore.css'
 }, $scope);

 vm.exploresManager = new ExploresManager();
 vm.constantsManager = new ConstantsManager();
 vm.exploreLevels;
 vm.appTypes;



 vm.createExplore = function (data) {
  vm.exploresManager.createExplore(data).then(function (response) {
   vm.FormDisplay = false;
   vm.newExploreData = angular.copy(vm.defaultExploreData);
   vm.exploresCopy = angular.copy(vm.exploresManager.explores);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editExplore = function (data) {
  vm.exploresManager.editExplore(data).then(function (response) {
   vm.FormDisplay = false;
   vm.newExploreData = angular.copy(vm.defaultExploreData);
   vm.exploresCopy = angular.copy(vm.exploresManager.explores);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editExploreSections = {
  details: function (exploreId, detail) {
   var exploreData = {
    exploreId: exploreId,
    title: detail.title,
    description: detail.description
   };
   vm.editExplore(exploreData);
  }
 }

 vm.cancelExplore = function (form) {
  vm.FormDisplay = false;
  vm.newExploreData = angular.copy(vm.defaultExploreData)
  if (form) {
   form.$setPristine();
   form.$setUntouched();
  }
 };

 vm.revertExplore = function (explore, exploreCopy) {
  explore = exploreCopy;
  /*
   $filter('filter')
   (vm.exploresManager.explores, {id: exploreId}, true)[0]
   = angular.copy($filter('filter')
   (vm.exploresCopy, {id: exploreId}, true)[0]);
   if (explore.length && exploreCopy.length) {
   // vm.exploresManager.explores angular.copy(vm.exploresCopy);
   }
   */
 };






 vm.edited = null;

 $scope.$watch(angular.bind(this, function () {
  return vm.explores;
 }), function () {
  //vm.remainingCount = filterFilter(explores, {completed: false}).length;
  vm.doneCount = vm.exploresManager.explores.length - vm.remainingCount;
  vm.allChecked = !vm.remainingCount;
  //ExploreService.put(vm.explores);
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




 vm.edit = function (explore) {
  vm.edited = explore;
  // Clone the original explore to restore it on demand.
  vm.original = angular.copy(explore);
 };


 vm.doneEditing = function (explore) {
  vm.edited = null;
  explore.title = explore.title.trim();

  if (!explore.title) {
   vm.remove(explore);
  }
 };

 vm.openAddExploreModal = function () {
  var modalInstance = $uibModal.open({
   animation: true,
   templateUrl: 'add-explore-modal.html',
   controller: 'AddExploreCtrl as addExploreCtrl',
   backdrop: 'static',
   size: 'xl',
   resolve: {
    appTypes: function () {
     return vm.appTypes;
    }
   }
  });

  modalInstance.result.then(function (explore) {
   vm.exploresManager.createExplore(explore);
  }, function () {
   $log.info('Modal dismissed at: ' + new Date());
  });
 };

 //--------init------
 vm.constantsManager.getAppTypes().then(function (data) {
  vm.appTypes = data;
 });
 vm.constantsManager.getLevel(level_categories.explore).then(function (data) {
  vm.exploreLevels = data;
 });
};

exploresCtrl.$inject = [
 'level_categories',
 'ConstantsManager',
 'SearchManager',
 'ExploresManager',
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

angular.module("app.explore").controller('ExploresCtrl', exploresCtrl);