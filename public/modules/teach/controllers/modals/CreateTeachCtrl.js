var createTeachCtrl = function (
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
        teachTypes) {
 var vm = this;
 vm.wizardHandler = WizardHandler;
 vm.teach = {};
 vm.teachLevels;
 vm.teachTypes = teachTypes;
 vm.selectedTeachType;
 vm.wizardCurrentStep = "Choose Teach Type";

 vm.constantsSrv = new ConstantsSrv();

 vm.getLevels = function (appId) {
  vm.constantsSrv.getLevel(appId).then(function (data) {
   vm.teachLevels = data;
  });
 };

 vm.chooseTeachType = function (teachType) {
  vm.teach.teachTypeId = teachType.id;
  vm.selectedTeachType = teachType;
  vm.getLevels(teachType.id);
 };

 vm.next = function () {
  vm.wizardHandler.wizard('teach-form').next();
 };

 vm.previous = function (teachType) {
  vm.wizardHandler.wizard('teach-form').previous();
 };

 vm.ok = function () {
  $uibModalInstance.close(vm.teach);
 };

 vm.close = function () {
  $uibModalInstance.dismiss('cancel');
 };
};

createTeachCtrl.$inject = [
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
 'teachTypes'];

angular.module("app.teach").controller('CreateTeachCtrl', createTeachCtrl);
