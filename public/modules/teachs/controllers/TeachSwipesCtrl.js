var teachSwipesCtrl = function (
        level_categories,
        ConstantsManager,
        TeachSwipesManager,
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
 vm.currentTeachSwipe;
 vm.teachSwipeLevels;

 vm.getTeachSwipe = function () {
  vm.teachSwipesManager.getTeachSwipe().then(function (response) {
   vm.currentTeachSwipe = response;
  });
 };

 vm.createTeachSwipe = function (teachId, levelId) {
  var data = {
   teachId: teachId,
   levelId: levelId,
   description: ""
  };
  vm.teachSwipesManager.createTeachSwipe(data).then(function (response) {
   //vm.currentTeachSwipe = response;
  });
  vm.getTeachSwipe();
 };

 vm.viewTeachSwipes = function () {
  vm.teachSwipesManager.getTeachSwipes();
 };

 vm.teachSwipesManager = new TeachSwipesManager();
 vm.getTeachSwipe();
 vm.constantsManager.getLevel(level_categories.teach_swipe).then(function (data) {
  vm.teachSwipeLevels = data;
 });

};


teachSwipesCtrl.$inject = [
 'level_categories',
 'ConstantsManager',
 'TeachSwipesManager',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$uibModal',
 '$log',
 '$filter'];

angular.module("app.teachs").controller('TeachSwipesCtrl', teachSwipesCtrl);
