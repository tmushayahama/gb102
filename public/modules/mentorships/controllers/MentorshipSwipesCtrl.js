var mentorshipSwipesCtrl = function (
        level_categories,
        ConstantsManager,
        MentorshipSwipesManager,
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
 vm.currentMentorshipSwipe;
 vm.mentorshipSwipeLevels;

 vm.getMentorshipSwipe = function () {
  vm.mentorshipSwipesManager.getMentorshipSwipe().then(function (response) {
   vm.currentMentorshipSwipe = response;
  });
 };

 vm.createMentorshipSwipe = function (mentorshipId, levelId) {
  var data = {
   mentorshipId: mentorshipId,
   levelId: levelId,
   description: ""
  };
  vm.mentorshipSwipesManager.createMentorshipSwipe(data).then(function (response) {
   //vm.currentMentorshipSwipe = response;
  });
  vm.getMentorshipSwipe();
 };

 vm.viewMentorshipSwipes = function () {
  vm.mentorshipSwipesManager.getMentorshipSwipes();
 };

 vm.mentorshipSwipesManager = new MentorshipSwipesManager();
 vm.getMentorshipSwipe();
 vm.constantsManager.getLevel(level_categories.mentorship_swipe).then(function (data) {
  vm.mentorshipSwipeLevels = data;
 });

};


mentorshipSwipesCtrl.$inject = [
 'level_categories',
 'ConstantsManager',
 'MentorshipSwipesManager',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$uibModal',
 '$log',
 '$filter'];

angular.module("app.mentorships").controller('MentorshipSwipesCtrl', mentorshipSwipesCtrl);
