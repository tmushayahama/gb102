var createJournalCtrl = function (
        ConstantsSrv,
        level_categories,
        $uibModalInstance,
        WizardHandler,
        $scope,
        $state,
        $stateParams,
        $http,
        $rootScope,
        $location,
        $log,
        journalTypes) {
 var vm = this;
 vm.wizardHandler = WizardHandler;
 vm.journal = {};
 vm.journalLevels;
 vm.journalTypes = journalTypes;
 vm.selectedJournalType;
 vm.wizardCurrentStep = "Choose Journal Type";

 vm.constantsSrv = new ConstantsSrv();

 vm.getLevels = function (appId) {
  vm.constantsSrv.getLevel(appId).then(function (data) {
   vm.journalLevels = data;
  });
 };

 vm.chooseJournalType = function (journalType) {
  vm.journal.journalTypeId = journalType.id;
  vm.selectedJournalType = journalType;
  vm.getLevels(journalType.id);
 };

 vm.next = function () {
  vm.wizardHandler.wizard('journal-form').next();
 };

 vm.previous = function (journalType) {
  vm.wizardHandler.wizard('journal-form').previous();
 };

 vm.ok = function () {
  $uibModalInstance.close(vm.journal);
 };

 vm.close = function () {
  $uibModalInstance.dismiss('cancel');
 };
};

createJournalCtrl.$inject = [
 'ConstantsSrv',
 'level_categories',
 '$uibModalInstance',
 'WizardHandler',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$log',
 'journalTypes'];

angular.module("app.journal").controller('CreateJournalCtrl', createJournalCtrl);
