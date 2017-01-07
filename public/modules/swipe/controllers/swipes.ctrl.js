
var swipesCtrl = function (
        level_categories,
        ConstantsSrv,
        ComponentsSrv,
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

 vm.componentsSrv = new ComponentsSrv();
 vm.constantsSrv = new ConstantsSrv();
 vm.swipeLevels;


 vm.createSwipe = function (data) {
  vm.componentsSrv.createSwipe(data).then(function (response) {
   vm.FormDisplay = false;
   vm.newSwipeData = angular.copy(vm.defaultSwipeData);
   vm.swipesCopy = angular.copy(vm.componentsSrv.swipes);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editSwipe = function (data) {
  vm.componentsSrv.editSwipe(data).then(function (response) {
   vm.FormDisplay = false;
   vm.newSwipeData = angular.copy(vm.defaultSwipeData);
   vm.swipesCopy = angular.copy(vm.componentsSrv.swipes);
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


 //--------init------
 //vm.componentsSrv.getSwipes(vm.swipeId);
 vm.constantsSrv.getSubLevels(level_categories.swipe).then(function (data) {
  vm.swipeLevels = data;
 });
};

swipesCtrl.$inject = [
 'level_categories',
 'ConstantsSrv',
 'ComponentsSrv',
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