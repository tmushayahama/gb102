var groupSwipesCtrl = function (
        level_categories,
        ConstantsManager,
        GroupSwipesManager,
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
 vm.currentGroupSwipe;
 vm.groupSwipeLevels;

 vm.getGroupSwipe = function () {
  vm.groupSwipesManager.getGroupSwipe().then(function (response) {
   vm.currentGroupSwipe = response;
  });
 };

 vm.createGroupSwipe = function (groupId, levelId) {
  var data = {
   groupId: groupId,
   levelId: levelId,
   description: ""
  };
  vm.groupSwipesManager.createGroupSwipe(data).then(function (response) {
   //vm.currentGroupSwipe = response;
  });
  vm.getGroupSwipe();
 };

 vm.viewGroupSwipes = function () {
  vm.groupSwipesManager.getGroupSwipes();
 };

 vm.groupSwipesManager = new GroupSwipesManager();
 vm.getGroupSwipe();
 vm.constantsManager.getLevel(level_categories.group_swipe).then(function (data) {
  vm.groupSwipeLevels = data;
 });

};


groupSwipesCtrl.$inject = [
 'level_categories',
 'ConstantsManager',
 'GroupSwipesManager',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$uibModal',
 '$log',
 '$filter'];

angular.module("app.groups").controller('GroupSwipesCtrl', groupSwipesCtrl);
