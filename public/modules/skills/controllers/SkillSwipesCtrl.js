var skillSwipesCtrl = function (
        level_categories,
        ConstantsManager,
        SkillSwipesManager,
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
 vm.currentSkillSwipe;
 vm.skillSwipeLevels;

 vm.getSkillSwipe = function () {
  vm.skillSwipesManager.getSkillSwipe().then(function (response) {
   vm.currentSkillSwipe = response;
  });
 };

 vm.createSkillSwipe = function (skillId, levelId) {
  var data = {
   skillId: skillId,
   levelId: levelId,
   description: ""
  };
  vm.skillSwipesManager.createSkillSwipe(data).then(function (response) {
   //vm.currentSkillSwipe = response;
  });
  vm.getSkillSwipe();
 };

 vm.viewSkillSwipes = function () {
  vm.skillSwipesManager.getSkillSwipes();
 };

 vm.skillSwipesManager = new SkillSwipesManager();
 vm.getSkillSwipe();
 vm.constantsManager.getLevel(level_categories.skill_swipe).then(function (data) {
  vm.skillSwipeLevels = data;
 });

};


skillSwipesCtrl.$inject = [
 'level_categories',
 'ConstantsManager',
 'SkillSwipesManager',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$uibModal',
 '$log',
 '$filter'];

angular.module("app.skills").controller('SkillSwipesCtrl', skillSwipesCtrl);
