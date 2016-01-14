var profileSwipesCtrl = function (
        level_categories,
        ConstantsManager,
        ProfileSwipesManager,
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
 vm.currentProfileSwipe;
 vm.profileSwipeLevels;

 vm.getProfileSwipe = function () {
  vm.profileSwipesManager.getProfileSwipe().then(function (response) {
   vm.currentProfileSwipe = response;
  });
 };

 vm.createProfileSwipe = function (profileId, levelId) {
  var data = {
   profileId: profileId,
   levelId: levelId,
   description: ""
  };
  vm.profileSwipesManager.createProfileSwipe(data).then(function (response) {
   //vm.currentProfileSwipe = response;
  });
  vm.getProfileSwipe();
 };

 vm.viewProfileSwipes = function () {
  vm.profileSwipesManager.getProfileSwipes();
 };

 vm.profileSwipesManager = new ProfileSwipesManager();
 vm.getProfileSwipe();
 vm.constantsManager.getLevel(level_categories.profile_swipe).then(function (data) {
  vm.profileSwipeLevels = data;
 });

};


profileSwipesCtrl.$inject = [
 'level_categories',
 'ConstantsManager',
 'ProfileSwipesManager',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$uibModal',
 '$log',
 '$filter'];

angular.module("app.profile").controller('ProfileSwipesCtrl', profileSwipesCtrl);
