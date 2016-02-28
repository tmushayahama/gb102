var swipeHistoryCtrl = function (
        level_categories,
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
        $filter) {

 var vm = this;

 vm.constantsSrv = new ConstantsSrv();
 vm.swipeLevels;

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

 vm.getSwipeHistory = function () {
  vm.swipeSrv.getAllSwipes();
 };

 vm.swipeSrv = new SwipeSrv();
 vm.getSwipeHistory();
 vm.constantsSrv.getLevel(11).then(function (data) {
  vm.swipeLevels = data;
 });

};


swipeHistoryCtrl.$inject = [
 'level_categories',
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
 '$filter'];

angular.module("app.swipe").controller('SwipeHistoryCtrl', swipeHistoryCtrl);