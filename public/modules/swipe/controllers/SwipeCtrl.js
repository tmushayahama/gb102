var swipeCtrl = function (
        level_categories,
        ConstantsManager,
        SwipeManager,
        $scope,
        $timeout,
        $state,
        $stateParams,
        $http,
        $rootScope,
        $location,
        $uibModal,
        $log,
        $filter) {

 var vm = this;

 vm.constantsManager = new ConstantsManager();
 vm.currentExplore;
 vm.swipeLevels;

 vm.swipeRight = function ($event, exploreId) {
  vm.createSwipe(exploreId, vm.swipeLevels[2].id);

  var ele = $event.target;
  //var x = Math.floor(Math.random() * 200) + 1,
  $(ele).css({
   'transform': "translate(50%, 30%) rotate(" + 20 + "deg)",
   'opacity': "0.3"

  });
  $timeout(function () {
   $(ele).css({
    'transform': "translate(0%, 0%) rotate(" + 0 + "deg)",
    'opacity': "1"
   });
  }, 1000);
 };

 vm.swipeLeft = function ($event, exploreId) {
  vm.createSwipe(exploreId, vm.swipeLevels[0].id);
  var ele = $event.target;
  //var x = Math.floor(Math.random() * 200) + 1,
  $(ele).css({
   'transform': "translate(-50%, 30%) rotate(" + -20 + "deg)",
   'opacity': "0.3"

  });
  $timeout(function () {
   $(ele).css({
    'transform': "translate(0%, 0%) rotate(" + 0 + "deg)",
    'opacity': "1"
   });
  }, 1000);
 }
 vm.swipeDown = function ($event, exploreId) {
  vm.createSwipe(exploreId, vm.swipeLevels[1].id);
 }

 vm.getSwipe = function () {
  vm.swipeManager.getSwipe().then(function (response) {
   vm.currentExplore = response;
  });
 };

 vm.createSwipe = function (exploreId, levelId) {
  var data = {
   exploreId: exploreId,
   levelId: levelId,
   description: ""
  };
  vm.swipeManager.createSwipe(data).then(function (response) {
   //vm.currentExplore = response;
  });
  vm.getSwipe();
 };

 vm.viewSwipe = function () {
  vm.swipeManager.getSwipes();
 };

 vm.swipeManager = new SwipeManager();
 vm.getSwipe();
 vm.constantsManager.getLevel(11).then(function (data) {
  vm.swipeLevels = data;
 });

};


swipeCtrl.$inject = [
 'level_categories',
 'ConstantsManager',
 'SwipeManager',
 '$scope',
 '$timeout',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$uibModal',
 '$log',
 '$filter'];

angular.module("app.swipe").controller('SwipeCtrl', swipeCtrl);
