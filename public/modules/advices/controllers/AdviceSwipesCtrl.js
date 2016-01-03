var adviceSwipesCtrl = function (
        level_categories,
        ConstantsManager,
        AdviceSwipesManager,
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
 vm.currentAdviceSwipe;
 vm.adviceSwipeLevels;

 vm.getAdviceSwipe = function () {
  vm.adviceSwipesManager.getAdviceSwipe().then(function (response) {
   vm.currentAdviceSwipe = response;
  });
 };

 vm.createAdviceSwipe = function (adviceId, levelId) {
  var data = {
   adviceId: adviceId,
   levelId: levelId,
   description: ""
  };
  vm.adviceSwipesManager.createAdviceSwipe(data).then(function (response) {
   //vm.currentAdviceSwipe = response;
  });
  vm.getAdviceSwipe();
 };

 vm.viewAdviceSwipes = function () {
  vm.adviceSwipesManager.getAdviceSwipes();
 };

 vm.adviceSwipesManager = new AdviceSwipesManager();
 vm.getAdviceSwipe();
 vm.constantsManager.getLevel(level_categories.advice_swipe).then(function (data) {
  vm.adviceSwipeLevels = data;
 });

};


adviceSwipesCtrl.$inject = [
 'level_categories',
 'ConstantsManager',
 'AdviceSwipesManager',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$uibModal',
 '$log',
 '$filter'];

angular.module("app.advices").controller('AdviceSwipesCtrl', adviceSwipesCtrl);
