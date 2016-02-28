
var swipeCtrl = function (
        _,
        ConstantsSrv,
        SwipeSrv,
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

 vm.swipe = [];
 var swipeData = {
 };

 vm.range = function (min, max) {
  return _.range(min, max);
 };

 vm.swipeIcons = [];
 vm.swipeIconsArray = [];

 var getRand = function (min, max) {
  return Math.floor((Math.random() * max) + min);
 }

 vm.getRandomSwipeIcons = function () {
  for (var i = 0; i < 5; i++) {
   var rowArray = [];
   for (var j = 0; j < vm.swipeIcons.length; j++) {
    var rand = getRand(0, vm.swipeIcons.length);
    rowArray.push(vm.swipeIcons[rand].name);
   }
   vm.swipeIconsArray.push(rowArray);
  }
 };


 vm.swipeId = $stateParams.swipeId;

 vm.swipeSrv = new SwipeSrv();
 vm.constantsSrv = new ConstantsSrv();

 vm.swipeFormDisplay = false;

 vm.getSwipe = function (id, data) {
  vm.swipeSrv.getSwipe(id, data).success(function (response) {
   vm.swipe = response;
  }).error(function (response) {
   console.log(response);
  });
 };




 vm.defaultSwipeData = {
  swipeId: $stateParams.swipeId,
  privacy: 0
 }
 vm.newSwipeData = angular.copy(vm.defaultSwipeData);

 vm.showForm = function () {
  vm.FormDisplay = true;
 };

 vm.createSwipe = function (data) {
  vm.swipeSrv.createSwipe(data).then(function (response) {
   vm.FormDisplay = false;
   vm.newSwipeData = angular.copy(vm.defaultSwipeData);
   vm.swipeCopy = angular.copy(vm.swipeSrv.swipe);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editSwipe = function (data) {
  vm.swipeSrv.editSwipe(data).then(function (response) {
   vm.FormDisplay = false;
   vm.newSwipeData = angular.copy(vm.defaultSwipeData);
   vm.swipeCopy = angular.copy(vm.swipeSrv.swipe);
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
   (vm.swipeSrv.swipe, {id: swipeId}, true)[0]
   = angular.copy($filter('filter')
   (vm.swipeCopy, {id: swipeId}, true)[0]);
   if (swipe.length && swipeCopy.length) {
   // vm.swipeSrv.swipe angular.copy(vm.swipeCopy);
   }
   */
 };






 vm.edited = null;

 $scope.$watch(angular.bind(this, function () {
  return vm.swipe;
 }), function () {
  //vm.remainingCount = filterFilter(swipe, {completed: false}).length;
  vm.doneCount = vm.swipeSrv.swipe.length - vm.remainingCount;
  vm.allChecked = !vm.remainingCount;
  //SwipeService.put(vm.swipe);
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

 //--------init------
 vm.swipeSrv.getSwipe(vm.swipeId);
 vm.constantsSrv.getIcons(1).then(function (data) {
  vm.swipeIcons = data;
  vm.getRandomSwipeIcons();
 });
};

swipeCtrl.$inject = ['_',
 'ConstantsSrv',
 'SwipeSrv',
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

angular.module("app.swipe").controller('SwipeCtrl', swipeCtrl);