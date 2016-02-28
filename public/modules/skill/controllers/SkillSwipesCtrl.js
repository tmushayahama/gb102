var skillSwipesCtrl = function (
        level_categories,
        ConstantsSrv,
        SkillSwipesSrv,
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
 vm.currentSkillSwipe;
 vm.skillSwipeLevels;

 vm.getSkillSwipe = function () {
  vm.skillSwipesSrv.getSkillSwipe().then(function (response) {
   vm.currentSkillSwipe = response;
  });
 };

 vm.createSkillSwipe = function (skillId, levelId) {
  var data = {
   skillId: skillId,
   levelId: levelId,
   description: ""
  };
  vm.skillSwipesSrv.createSkillSwipe(data).then(function (response) {
   //vm.currentSkillSwipe = response;
  });
  vm.getSkillSwipe();
 };

 vm.viewSkillSwipes = function () {
  vm.skillSwipesSrv.getSkillSwipes();
 };

 vm.skillSwipesSrv = new SkillSwipesSrv();
 vm.getSkillSwipe();
 vm.constantsSrv.getLevel(level_categories.skill_swipe).then(function (data) {
  vm.skillSwipeLevels = data;
 });

};


skillSwipesCtrl.$inject = [
 'level_categories',
 'ConstantsSrv',
 'SkillSwipesSrv',
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
