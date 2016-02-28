var createProjectCtrl = function (
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
        projectTypes) {
 var vm = this;
 vm.wizardHandler = WizardHandler;
 vm.project = {};
 vm.projectLevels;
 vm.projectTypes = projectTypes;
 vm.selectedProjectType;
 vm.wizardCurrentStep = "Choose Project Type";

 vm.constantsSrv = new ConstantsSrv();

 vm.getLevels = function (appId) {
  vm.constantsSrv.getLevel(appId).then(function (data) {
   vm.projectLevels = data;
  });
 };

 vm.chooseProjectType = function (projectType) {
  vm.project.projectTypeId = projectType.id;
  vm.selectedProjectType = projectType;
  vm.getLevels(projectType.id);
 };

 vm.next = function () {
  vm.wizardHandler.wizard('project-form').next();
 };

 vm.previous = function (projectType) {
  vm.wizardHandler.wizard('project-form').previous();
 };

 vm.ok = function () {
  $uibModalInstance.close(vm.project);
 };

 vm.close = function () {
  $uibModalInstance.dismiss('cancel');
 };
};

createProjectCtrl.$inject = [
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
 'projectTypes'];

angular.module("app.project").controller('CreateProjectCtrl', createProjectCtrl);
