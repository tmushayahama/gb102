var createCollaborationCtrl = function (
        ConstantsManager,
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
        collaborationTypes) {
 var vm = this;
 vm.wizardHandler = WizardHandler;
 vm.collaboration = {};
 vm.collaborationLevels;
 vm.collaborationTypes = collaborationTypes;
 vm.selectedCollaborationType;
 vm.wizardCurrentStep = "Choose Collaboration Type";

 vm.constantsManager = new ConstantsManager();

 vm.getLevels = function (appId) {
  vm.constantsManager.getLevel(appId).then(function (data) {
   vm.collaborationLevels = data;
  });
 };

 vm.chooseCollaborationType = function (collaborationType) {
  vm.collaboration.collaborationTypeId = collaborationType.id;
  vm.selectedCollaborationType = collaborationType;
  vm.getLevels(collaborationType.id);
 };

 vm.next = function () {
  vm.wizardHandler.wizard('collaboration-form').next();
 };

 vm.previous = function (collaborationType) {
  vm.wizardHandler.wizard('collaboration-form').previous();
 };

 vm.ok = function () {
  $uibModalInstance.close(vm.collaboration);
 };

 vm.close = function () {
  $uibModalInstance.dismiss('cancel');
 };
};

createCollaborationCtrl.$inject = [
 'ConstantsManager',
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
 'collaborationTypes'];

angular.module("app.collaboration").controller('CreateCollaborationCtrl', createCollaborationCtrl);
