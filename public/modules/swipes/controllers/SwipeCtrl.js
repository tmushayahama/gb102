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
