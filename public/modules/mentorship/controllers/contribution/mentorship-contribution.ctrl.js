var mentorshipContributorCtrl = function (
        MentorshipContributorSrv,
        $uibModalInstance,
        $scope,
        $state,
        $stateParams,
        $http,
        $rootScope,
        $location,
        $log,
        mentorshipContributorData) {
 var vm = this;
 vm.mentorshipId = mentorshipContributorData.mentorship_id;
 vm.mentorshipContributorId = mentorshipContributorData.id;
 vm.mentorshipContributorSrv = new MentorshipContributorSrv();


 vm.contributorId = mentorshipContributorData.contributor_id;

 vm.contributorFormDisplay = false;




 vm.ok = function () {
  $uibModalInstance.close();
 };

 vm.close = function () {
  $uibModalInstance.dismiss('cancel');
 };

 // vm.newMentorshipContributorData = vm.defaultMentorshipContributorData;

 vm.getMentorshipContributor = function (mentorshipId, contributorId) {
  vm.mentorshipContributorSrv.getMentorshipContributor(mentorshipId, contributorId).then(function (response) {
  }, function (error) {
   console.log(error);
  });
 };

 vm.editMentorshipContributor = function (data) {
  vm.mentorshipContributorSrv.editMentorshipContributor(data).then(function (response) {
  }, function (response) {
   console.log(response);
  });
 };

 vm.editMentorshipContributorSections = {
  details: function (details) {
   var mentorshipContributorData = {
    mentorshipContributorId: vm.mentorshipContributorId,
    title: details.title,
    description: details.description
   };
   vm.editMentorshipContributor(mentorshipContributorData);
  }
 }



 vm.showContributorForm = function () {
  vm.contributorFormDisplay = true;
 };



 //--------init------
 vm.getMentorshipContributor(vm.mentorshipId, vm.contributorId);
};

mentorshipContributorCtrl.$inject = [
 'MentorshipContributorSrv',
 '$uibModalInstance',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$log',
 'mentorshipContributorData'];

angular.module("app.mentorship").controller('MentorshipContributorCtrl', mentorshipContributorCtrl);
