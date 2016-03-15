var swipeCtrl = function (
        level_categories,
        ConstantsSrv,
        SwipeSrv,
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

 $scope.cards = [
  {name: 'clubs', symbol: '♣'},
  {name: 'diamonds', symbol: '♦'},
  {name: 'hearts', symbol: '♥'},
  {name: 'spades', symbol: '♠'}
 ];

 $scope.throwout = function (eventName, eventObject) {
  console.log('throwout', eventObject);
 };

 $scope.throwoutleft = function (eventName, eventObject) {
  console.log('throwoutleft', eventObject);
 };

 $scope.throwoutright = function (eventName, eventObject) {
  console.log('throwoutright', eventObject);
 };

 $scope.throwin = function (eventName, eventObject) {
  console.log('throwin', eventObject);
 };

 $scope.dragstart = function (eventName, eventObject) {
  console.log('dragstart', eventObject);
 };

 $scope.dragmove = function (eventName, eventObject) {
  console.log('dragmove', eventObject);
 };

 $scope.dragend = function (eventName, eventObject) {
  console.log('dragend', eventObject);
 };

 $scope.options = {
  throwOutConfidence: function (offset, elementWidth) {
   console.log('throwOutConfidence', offset, elementWidth);
   return Math.min(Math.abs(offset) / elementWidth, 1);
  },
  isThrowOut: function (offset, elementWidth, throwOutConfidence) {
   console.log('isThrowOut', offset, elementWidth, throwOutConfidence);
   return throwOutConfidence === 1;
  }
 };

 vm.constantsSrv = new ConstantsSrv();
 vm.currentExplorer;
 vm.swipeLevels;

 vm.swipeRight = function ($event, explorerId) {
  vm.createSwipe(explorerId, vm.swipeLevels[2].id);

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

 vm.swipeLeft = function ($event, explorerId) {
  vm.createSwipe(explorerId, vm.swipeLevels[0].id);
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
 vm.swipeDown = function ($event, explorerId) {
  vm.createSwipe(explorerId, vm.swipeLevels[1].id);
 }

 vm.getSwipe = function () {
  vm.swipeSrv.getSwipe().then(function (response) {
   vm.currentExplorer = response;
  });
 };

 vm.createSwipe = function (explorerId, levelId) {
  var data = {
   explorerId: explorerId,
   levelId: levelId,
   description: ""
  };
  vm.swipeSrv.createSwipe(data).then(function (response) {
   //vm.currentExplorer = response;
  });
  vm.getSwipe();
 };

 vm.viewSwipe = function () {
  vm.swipeSrv.getSwipes();
 };

 vm.swipeSrv = new SwipeSrv();
 vm.getSwipe();
 vm.constantsSrv.getLevel(11).then(function (data) {
  vm.swipeLevels = data;
 });

};


swipeCtrl.$inject = [
 'level_categories',
 'ConstantsSrv',
 'SwipeSrv',
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
