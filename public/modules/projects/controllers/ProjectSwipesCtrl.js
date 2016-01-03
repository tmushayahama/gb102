var projectSwipesCtrl = function (
        level_categories,
        ConstantsManager,
        ProjectSwipesManager,
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
 vm.currentProjectSwipe;
 vm.projectSwipeLevels;

 vm.getProjectSwipe = function () {
  vm.projectSwipesManager.getProjectSwipe().then(function (response) {
   vm.currentProjectSwipe = response;
  });
 };

 vm.createProjectSwipe = function (projectId, levelId) {
  var data = {
   projectId: projectId,
   levelId: levelId,
   description: ""
  };
  vm.projectSwipesManager.createProjectSwipe(data).then(function (response) {
   //vm.currentProjectSwipe = response;
  });
  vm.getProjectSwipe();
 };

 vm.viewProjectSwipes = function () {
  vm.projectSwipesManager.getProjectSwipes();
 };

 vm.projectSwipesManager = new ProjectSwipesManager();
 vm.getProjectSwipe();
 vm.constantsManager.getLevel(level_categories.project_swipe).then(function (data) {
  vm.projectSwipeLevels = data;
 });

};


projectSwipesCtrl.$inject = [
 'level_categories',
 'ConstantsManager',
 'ProjectSwipesManager',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$uibModal',
 '$log',
 '$filter'];

angular.module("app.projects").controller('ProjectSwipesCtrl', projectSwipesCtrl);
