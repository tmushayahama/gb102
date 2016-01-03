var skillSwipesCtrl = function (
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
 vm.currentSkillSwipe;

 vm.getSkillSwipe = function () {
  vm.skillSwipesManager.getSkillSwipe().then(function (response) {
   vm.currentSkillSwipe = response;
  });
 };

 vm.swipeInterested = function (skill) {
  vm.getSkillSwipe();
 };
 vm.swipeNotNow = function (skill) {
  vm.getSkillSwipe();
 };
 vm.swipeNotInterested = function (skill) {
  vm.getSkillSwipe();
 };

 vm.skillSwipesManager = new SkillSwipesManager();
 vm.getSkillSwipe();
};


skillSwipesCtrl.$inject = [
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
