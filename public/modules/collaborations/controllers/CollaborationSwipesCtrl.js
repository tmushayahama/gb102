var collaborationSwipesCtrl = function (
        level_categories,
        ConstantsManager,
        CollaborationSwipesManager,
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
 vm.currentCollaborationSwipe;
 vm.collaborationSwipeLevels;

 vm.getCollaborationSwipe = function () {
  vm.collaborationSwipesManager.getCollaborationSwipe().then(function (response) {
   vm.currentCollaborationSwipe = response;
  });
 };

 vm.createCollaborationSwipe = function (collaborationId, levelId) {
  var data = {
   collaborationId: collaborationId,
   levelId: levelId,
   description: ""
  };
  vm.collaborationSwipesManager.createCollaborationSwipe(data).then(function (response) {
   //vm.currentCollaborationSwipe = response;
  });
  vm.getCollaborationSwipe();
 };

 vm.viewCollaborationSwipes = function () {
  vm.collaborationSwipesManager.getCollaborationSwipes();
 };

 vm.collaborationSwipesManager = new CollaborationSwipesManager();
 vm.getCollaborationSwipe();
 vm.constantsManager.getLevel(level_categories.collaboration_swipe).then(function (data) {
  vm.collaborationSwipeLevels = data;
 });

};


collaborationSwipesCtrl.$inject = [
 'level_categories',
 'ConstantsManager',
 'CollaborationSwipesManager',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$uibModal',
 '$log',
 '$filter'];

angular.module("app.collaborations").controller('CollaborationSwipesCtrl', collaborationSwipesCtrl);
