var communitySwipesCtrl = function (
        level_categories,
        ConstantsManager,
        CommunitySwipesManager,
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
 vm.currentCommunitySwipe;
 vm.communitySwipeLevels;

 vm.getCommunitySwipe = function () {
  vm.communitySwipesManager.getCommunitySwipe().then(function (response) {
   vm.currentCommunitySwipe = response;
  });
 };

 vm.createCommunitySwipe = function (communityId, levelId) {
  var data = {
   communityId: communityId,
   levelId: levelId,
   description: ""
  };
  vm.communitySwipesManager.createCommunitySwipe(data).then(function (response) {
   //vm.currentCommunitySwipe = response;
  });
  vm.getCommunitySwipe();
 };

 vm.viewCommunitySwipes = function () {
  vm.communitySwipesManager.getCommunitySwipes();
 };

 vm.communitySwipesManager = new CommunitySwipesManager();
 vm.getCommunitySwipe();
 vm.constantsManager.getLevel(level_categories.community_swipe).then(function (data) {
  vm.communitySwipeLevels = data;
 });

};


communitySwipesCtrl.$inject = [
 'level_categories',
 'ConstantsManager',
 'CommunitySwipesManager',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$uibModal',
 '$log',
 '$filter'];

angular.module("app.communitys").controller('CommunitySwipesCtrl', communitySwipesCtrl);
