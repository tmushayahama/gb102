var mentorshipCommentCtrl = function (
        MentorshipCommentManager,
        $uibModalInstance,
        $scope,
        $state,
        $stateParams,
        $http,
        $rootScope,
        $location,
        $log,
        mentorshipCommentData) {
 var vm = this;
 vm.mentorshipId = mentorshipCommentData.mentorship_id;
 vm.mentorshipCommentId = mentorshipCommentData.id;
 vm.mentorshipCommentManager = new MentorshipCommentManager();


 vm.commentId = mentorshipCommentData.comment_id;

 vm.commentFormDisplay = false;




 vm.ok = function () {
  $uibModalInstance.close();
 };

 vm.close = function () {
  $uibModalInstance.dismiss('cancel');
 };

 // vm.newMentorshipCommentData = vm.defaultMentorshipCommentData;

 vm.getMentorshipComment = function (mentorshipId, commentId) {
  vm.mentorshipCommentManager.getMentorshipComment(mentorshipId, commentId).then(function (response) {
  }, function (error) {
   console.log(error);
  });
 };

 vm.editMentorshipComment = function (data) {
  vm.mentorshipCommentManager.editMentorshipComment(data).then(function (response) {
  }, function (response) {
   console.log(response);
  });
 };

 vm.editMentorshipCommentSections = {
  details: function (details) {
   var mentorshipCommentData = {
    mentorshipCommentId: vm.mentorshipCommentId,
    title: details.title,
    description: details.description
   };
   vm.editMentorshipComment(mentorshipCommentData);
  }
 }



 vm.showCommentForm = function () {
  vm.commentFormDisplay = true;
 };



 //--------init------
 vm.getMentorshipComment(vm.mentorshipId, vm.commentId);
};

mentorshipCommentCtrl.$inject = [
 'MentorshipCommentManager',
 '$uibModalInstance',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$log',
 'mentorshipCommentData'];

angular.module("app.mentorships").controller('MentorshipCommentCtrl', mentorshipCommentCtrl);
