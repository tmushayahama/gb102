var exploreSwipesCtrl = function (
        level_categories,
        ConstantsManager,
        ExploreSwipesManager,
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
 vm.currentExploreSwipe;
 vm.exploreSwipeLevels;

 vm.getExploreSwipe = function () {
  vm.exploreSwipesManager.getExploreSwipe().then(function (response) {
   vm.currentExploreSwipe = response;
  });
 };

 vm.createExploreSwipe = function (exploreId, levelId) {
  var data = {
   exploreId: exploreId,
   levelId: levelId,
   description: ""
  };
  vm.exploreSwipesManager.createExploreSwipe(data).then(function (response) {
   //vm.currentExploreSwipe = response;
  });
  vm.getExploreSwipe();
 };

 vm.viewExploreSwipes = function () {
  vm.exploreSwipesManager.getExploreSwipes();
 };

 vm.exploreSwipesManager = new ExploreSwipesManager();
 vm.getExploreSwipe();
 vm.constantsManager.getLevel(level_categories.explore_swipe).then(function (data) {
  vm.exploreSwipeLevels = data;
 });

};


exploreSwipesCtrl.$inject = [
 'level_categories',
 'ConstantsManager',
 'ExploreSwipesManager',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$uibModal',
 '$log',
 '$filter'];

angular.module("app.explores").controller('ExploreSwipesCtrl', exploreSwipesCtrl);
