var addMentorshipCtrl = function (
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
        appTypes) {
 var vm = this;
 vm.wizardHandler = WizardHandler;
 vm.mentorship = {};
 vm.mentorshipLevels;
 vm.requestTypes;
 vm.appTypes = appTypes;
 vm.selectedAppType;
 vm.wizardCurrentStep = "Choose App";

 vm.constantsSrv = new ConstantsSrv();

 vm.getLevels = function (appId) {
  vm.constantsSrv.getLevel(appId).then(function (data) {
   vm.mentorshipLevels = data;
  });
 };

 vm.getRequestTypes = function (appId) {
  vm.constantsSrv.getLevel(appId + level_categories.request_type_offset).then(function (data) {
   vm.requestTypes = [];
   angular.forEach(data, function (requestLevel) {
    vm.requestTypes.push(
            {
             requestLevel: requestLevel,
             mentorshipRequest: {
              levelId: requestLevel.id,
              description: ''
             }
            }
    );
   });
  }
  )
 };

 vm.chooseAppType = function (appType) {
  vm.mentorship.app_type_id = appType.id;
  vm.selectedAppType = appType;
  vm.getLevels(appType.id);
  vm.getRequestTypes(appType.id);
 };

 vm.next = function () {
  vm.wizardHandler.wizard('mentorship-form').next();
 };

 vm.previous = function (appType) {
  vm.wizardHandler.wizard('mentorship-form').previous();
 };

 vm.ok = function () {
  vm.mentorship.mentorship_requests = [];
  angular.forEach(vm.selectedRequestTypes, function (selectedRequestType) {
   vm.mentorship.mentorship_requests.push(selectedRequestType.mentorshipRequest);
  });

  $uibModalInstance.close(vm.mentorship);
 };

 vm.close = function () {
  $uibModalInstance.dismiss('cancel');
 };
};

addMentorshipCtrl.$inject = [
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
 'appTypes'];

angular.module("app.mentorship").controller('AddMentorshipCtrl', addMentorshipCtrl);
