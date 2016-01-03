var hobbySwipesCtrl = function (
        level_categories,
        ConstantsManager,
        HobbySwipesManager,
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
 vm.currentHobbySwipe;
 vm.hobbySwipeLevels;

 vm.getHobbySwipe = function () {
  vm.hobbySwipesManager.getHobbySwipe().then(function (response) {
   vm.currentHobbySwipe = response;
  });
 };

 vm.createHobbySwipe = function (hobbyId, levelId) {
  var data = {
   hobbyId: hobbyId,
   levelId: levelId,
   description: ""
  };
  vm.hobbySwipesManager.createHobbySwipe(data).then(function (response) {
   //vm.currentHobbySwipe = response;
  });
  vm.getHobbySwipe();
 };

 vm.viewHobbySwipes = function () {
  vm.hobbySwipesManager.getHobbySwipes();
 };

 vm.hobbySwipesManager = new HobbySwipesManager();
 vm.getHobbySwipe();
 vm.constantsManager.getLevel(level_categories.hobby_swipe).then(function (data) {
  vm.hobbySwipeLevels = data;
 });

};


hobbySwipesCtrl.$inject = [
 'level_categories',
 'ConstantsManager',
 'HobbySwipesManager',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$uibModal',
 '$log',
 '$filter'];

angular.module("app.hobbys").controller('HobbySwipesCtrl', hobbySwipesCtrl);
