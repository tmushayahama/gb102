var createMentorshipContributionCtrl = function (
        ConstantsSrv,
        CommunitySrv,
        MentorshipContributionsSrv,
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
        contributionType) {
 var vm = this;

 vm.mentorshipId = $stateParams.mentorshipId;
 vm.contributionType = contributionType;
 vm.communitySrv = new CommunitySrv();
 vm.mentorshipContributionsSrv = new MentorshipContributionsSrv();
 vm.users;
 vm.getUsers = function () {
  vm.communitySrv.getUsers().then(function (data) {
   vm.users = data;
  });
 };

 vm.select = function () {
  vm.mentorship.mentorship_requests = [];
  angular.forEach(vm.selectedRequestTypes, function (selectedRequestType) {
   vm.mentorship.mentorship_requests.push(selectedRequestType.mentorshipRequest);
  });

  $uibModalInstance.close(vm.mentorship);
 };

 vm.sendRequest = function (userId) {
  var requestData = {
   contributor_id: userId,
   level_id: vm.contributionType.id,
   description: "",
   mentorship_id: vm.mentorshipId
  };
  vm.mentorshipContributionsSrv.createMentorshipContribution(requestData)
          .then(function (data) {

          });
 };

 vm.cancel = function () {
  $uibModalInstance.dismiss('cancel');
 };

 vm.getUsers();
};


createMentorshipContributionCtrl.$inject = [
 'ConstantsSrv',
 'CommunitySrv',
 'MentorshipContributionsSrv',
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
 'contributionType'];

angular.module("app.mentorship").controller('CreateMentorshipContributionCtrl', createMentorshipContributionCtrl);
