var createMentorshipCtrl = function (
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
        mentorshipTypes) {
 var vm = this;
 vm.wizardHandler = WizardHandler;
 vm.mentorship = {};
 vm.mentorshipLevels;
 vm.mentorshipTypes = mentorshipTypes;
 vm.selectedMentorshipType;
 vm.wizardCurrentStep = "Choose Mentorship Type";

 vm.constantsSrv = new ConstantsSrv();

 vm.getLevels = function (appId) {
  vm.constantsSrv.getLevel(appId).then(function (data) {
   vm.mentorshipLevels = data;
  });
 };

 vm.chooseMentorshipType = function (mentorshipType) {
  vm.mentorship.mentorshipTypeId = mentorshipType.id;
  vm.selectedMentorshipType = mentorshipType;
  vm.getLevels(mentorshipType.id);
 };

 vm.next = function () {
  vm.wizardHandler.wizard('mentorship-form').next();
 };

 vm.previous = function (mentorshipType) {
  vm.wizardHandler.wizard('mentorship-form').previous();
 };

 vm.ok = function () {
  $uibModalInstance.close(vm.mentorship);
 };

 vm.close = function () {
  $uibModalInstance.dismiss('cancel');
 };
};

createMentorshipCtrl.$inject = [
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
 'mentorshipTypes'];

angular.module("app.mentorship").controller('CreateMentorshipCtrl', createMentorshipCtrl);
