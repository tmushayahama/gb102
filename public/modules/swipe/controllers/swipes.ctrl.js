
var swipesCtrl = function (
        level_categories,
        ConstantsSrv,
        SwipesSrv,
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
  href: 'public/css/gb-sass/stylesheets/gb-themes/app-theme-swipe.css'
 }, $scope);

 $rootScope.appName = 'SWIPE';

 vm.swipesSrv = new SwipesSrv();
 vm.constantsSrv = new ConstantsSrv();
 vm.swipeLevels;


 vm.createSwipe = function (data) {
  vm.swipesSrv.createSwipe(data).then(function (response) {
   vm.FormDisplay = false;
   vm.newSwipeData = angular.copy(vm.defaultSwipeData);
   vm.swipesCopy = angular.copy(vm.swipesSrv.swipes);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editSwipe = function (data) {
  vm.swipesSrv.editSwipe(data).then(function (response) {
   vm.FormDisplay = false;
   vm.newSwipeData = angular.copy(vm.defaultSwipeData);
   vm.swipesCopy = angular.copy(vm.swipesSrv.swipes);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editSwipeSections = {
  details: function (swipeId, detail) {
   var swipeData = {
    swipeId: swipeId,
    title: detail.title,
    description: detail.description
   };
   vm.editSwipe(swipeData);
  }
 }

 vm.cancelSwipe = function (form) {
  vm.FormDisplay = false;
  vm.newSwipeData = angular.copy(vm.defaultSwipeData)
  if (form) {
   form.$setPristine();
   form.$setUntouched();
  }
 };

 vm.revertSwipe = function (swipe, swipeCopy) {
  swipe = swipeCopy;
  /*
   $filter('filter')
   (vm.swipesSrv.swipes, {id: swipeId}, true)[0]
   = angular.copy($filter('filter')
   (vm.swipesCopy, {id: swipeId}, true)[0]);
   if (swipe.length && swipeCopy.length) {
   // vm.swipesSrv.swipes angular.copy(vm.swipesCopy);
   }
   */
 };






 vm.edited = null;

 $scope.$watch(angular.bind(this, function () {
  return vm.swipes;
 }), function () {
  //vm.remainingCount = filterFilter(swipes, {completed: false}).length;
  vm.doneCount = vm.swipesSrv.swipes.length - vm.remainingCount;
  vm.allChecked = !vm.remainingCount;
  //SwipeService.put(vm.swipes);
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




 vm.edit = function (swipe) {
  vm.edited = swipe;
  // Clone the original swipe to restore it on demand.
  vm.original = angular.copy(swipe);
 };


 vm.doneEditing = function (swipe) {
  vm.edited = null;
  swipe.title = swipe.title.trim();

  if (!swipe.title) {
   vm.remove(swipe);
  }
 };

 vm.openAddSwipeModal = function () {
  var modalInstance = $uibModal.open({
   animation: true,
   templateUrl: 'add-swipe-modal.html',
   controller: 'AddSwipeCtrl as addSwipeCtrl',
   backdrop: 'static',
   size: 'xl',
   resolve: {
    swipeLevels: function () {
     return vm.swipeLevels;
    }
   }
  });

  modalInstance.result.then(function (swipe) {
   vm.swipesSrv.createSwipe(swipe);
  }, function () {
   $log.info('Modal dismissed at: ' + new Date());
  });
 };

 //--------init------
 //vm.swipesSrv.getSwipes(vm.swipeId);
 vm.constantsSrv.getLevel(level_categories.swipe).then(function (data) {
  vm.swipeLevels = data;
 });
};

swipesCtrl.$inject = [
 'level_categories',
 'ConstantsSrv',
 'SwipesSrv',
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

angular.module("app.swipe").controller('SwipesCtrl', swipesCtrl);