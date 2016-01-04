var swipeCtrl = function (
        level_categories,
        ConstantsManager,
        SwipeManager,
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

 vm.constantsManager = new ConstantsManager();
 vm.currentExplore;
 vm.swipeLevels;

 vm.cards = [
  {name: 'clubs', symbol: '♣'},
  {name: 'diamonds', symbol: '♦'},
  {name: 'hearts', symbol: '♥'},
  {name: 'spades', symbol: '♠'}
 ];

 vm.throwout = function (eventName, eventObject) {
  console.log('throwout', eventObject);
 };

 vm.throwoutleft = function (eventName, eventObject) {
  console.log('throwoutleft', eventObject);
 };

 vm.throwoutright = function (eventName, eventObject) {
  console.log('throwoutright', eventObject);
 };

 vm.throwin = function (eventName, eventObject) {
  console.log('throwin', eventObject);
 };

 vm.dragstart = function (eventName, eventObject) {
  console.log('dragstart', eventObject);
 };

 vm.dragmove = function (eventName, eventObject) {
  console.log('dragmove', eventObject);
 };

 vm.dragend = function (eventName, eventObject) {
  console.log('dragend', eventObject);
 };

 vm.options = {
  throwOutConfidence: function (offset, elementWidth) {
   console.log('throwOutConfidence', offset, elementWidth);
   return Math.min(Math.abs(offset) / elementWidth, 1);
  },
  isThrowOut: function (offset, elementWidth, throwOutConfidence) {
   console.log('isThrowOut', offset, elementWidth, throwOutConfidence);
   return throwOutConfidence === 1;
  }
 };

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
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$uibModal',
 '$log',
 '$filter'];

angular.module("app.swipes").controller('SwipeCtrl', swipeCtrl);
