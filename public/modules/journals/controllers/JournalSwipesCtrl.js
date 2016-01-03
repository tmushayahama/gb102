var journalSwipesCtrl = function (
        level_categories,
        ConstantsManager,
        JournalSwipesManager,
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
 vm.currentJournalSwipe;
 vm.journalSwipeLevels;

 vm.getJournalSwipe = function () {
  vm.journalSwipesManager.getJournalSwipe().then(function (response) {
   vm.currentJournalSwipe = response;
  });
 };

 vm.createJournalSwipe = function (journalId, levelId) {
  var data = {
   journalId: journalId,
   levelId: levelId,
   description: ""
  };
  vm.journalSwipesManager.createJournalSwipe(data).then(function (response) {
   //vm.currentJournalSwipe = response;
  });
  vm.getJournalSwipe();
 };

 vm.viewJournalSwipes = function () {
  vm.journalSwipesManager.getJournalSwipes();
 };

 vm.journalSwipesManager = new JournalSwipesManager();
 vm.getJournalSwipe();
 vm.constantsManager.getLevel(level_categories.journal_swipe).then(function (data) {
  vm.journalSwipeLevels = data;
 });

};


journalSwipesCtrl.$inject = [
 'level_categories',
 'ConstantsManager',
 'JournalSwipesManager',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$uibModal',
 '$log',
 '$filter'];

angular.module("app.journals").controller('JournalSwipesCtrl', journalSwipesCtrl);
