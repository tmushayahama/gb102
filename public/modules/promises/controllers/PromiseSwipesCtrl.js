var promiseSwipesCtrl = function (
        level_categories,
        ConstantsManager,
        PromiseSwipesManager,
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
 vm.currentPromiseSwipe;
 vm.promiseSwipeLevels;

 vm.getPromiseSwipe = function () {
  vm.promiseSwipesManager.getPromiseSwipe().then(function (response) {
   vm.currentPromiseSwipe = response;
  });
 };

 vm.createPromiseSwipe = function (promiseId, levelId) {
  var data = {
   promiseId: promiseId,
   levelId: levelId,
   description: ""
  };
  vm.promiseSwipesManager.createPromiseSwipe(data).then(function (response) {
   //vm.currentPromiseSwipe = response;
  });
  vm.getPromiseSwipe();
 };

 vm.viewPromiseSwipes = function () {
  vm.promiseSwipesManager.getPromiseSwipes();
 };

 vm.promiseSwipesManager = new PromiseSwipesManager();
 vm.getPromiseSwipe();
 vm.constantsManager.getLevel(level_categories.promise_swipe).then(function (data) {
  vm.promiseSwipeLevels = data;
 });

};


promiseSwipesCtrl.$inject = [
 'level_categories',
 'ConstantsManager',
 'PromiseSwipesManager',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$uibModal',
 '$log',
 '$filter'];

angular.module("app.promises").controller('PromiseSwipesCtrl', promiseSwipesCtrl);
