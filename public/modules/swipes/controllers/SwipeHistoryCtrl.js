var swipeHistoryCtrl = function (
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
 vm.swipeLevels;

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

 vm.getSwipeHistory = function () {
  vm.swipeManager.getSwipes();
 };

 vm.swipeManager = new SwipeManager();
 vm.getSwipeHistory();
 vm.constantsManager.getLevel(11).then(function (data) {
  vm.swipeLevels = data;
 });

};


swipeHistoryCtrl.$inject = [
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

angular.module("app.swipes").controller('SwipeHistoryCtrl', swipeHistoryCtrl);
