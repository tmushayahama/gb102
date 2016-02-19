var mentorshipProgressCtrl = function (
        MentorshipProgressManager,
        $uibModalInstance,
        $scope,
        $state,
        $stateParams,
        $http,
        $rootScope,
        $location,
        $log,
        mentorshipProgressData) {
 var vm = this;
 vm.mentorshipId = mentorshipProgressData.mentorship_id;
 vm.mentorshipProgressId = mentorshipProgressData.id;
 vm.mentorshipProgressManager = new MentorshipProgressManager();


 vm.progressId = mentorshipProgressData.progress_id;

 vm.progressFormDisplay = false;




 vm.ok = function () {
  $uibModalInstance.close();
 };

 vm.close = function () {
  $uibModalInstance.dismiss('cancel');
 };

 // vm.newMentorshipProgressData = vm.defaultMentorshipProgressData;

 vm.getMentorshipProgress = function (mentorshipId, progressId) {
  vm.mentorshipProgressManager.getMentorshipProgress(mentorshipId, progressId).then(function (response) {
  }, function (error) {
   console.log(error);
  });
 };

 vm.editMentorshipProgress = function (data) {
  vm.mentorshipProgressManager.editMentorshipProgress(data).then(function (response) {
  }, function (response) {
   console.log(response);
  });
 };

 vm.editMentorshipProgressSections = {
  details: function (details) {
   var mentorshipProgressData = {
    mentorshipProgressId: vm.mentorshipProgressId,
    title: details.title,
    description: details.description
   };
   vm.editMentorshipProgress(mentorshipProgressData);
  }
 }



 vm.showProgressForm = function () {
  vm.progressFormDisplay = true;
 };



 //--------init------
 vm.getMentorshipProgress(vm.mentorshipId, vm.progressId);
};


mentorshipProgressCtrl.$inject = [
 'MentorshipProgressManager',
 '$uibModalInstance',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$log',
 'mentorshipProgressData'];

angular.module("app.mentorship").controller('MentorshipProgressCtrl', mentorshipProgressCtrl);
