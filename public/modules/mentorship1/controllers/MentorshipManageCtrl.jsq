var mentorshipManageCtrl = function (
        MentorshipSrv,
        $state,
        $stateParams,
        $http,
        $q,
        $rootScope) {
 var vm = this;
 vm.mentorshipId = $stateParams.mentorshipId;
 vm.mentorships;
 vm.mentorshipSrv = new MentorshipSrv();

 vm.getMentorship = function (id) {
  vm.mentorshipSrv.getMentorship(id).then(function (data) {
   vm.mentorship = data;
   vm.getSubMentorships(vm.mentorship.explorer_id);
  });
 };

 vm.getSubMentorships = function (explorerId) {
  vm.mentorshipSrv.getSubMentorships(explorerId).then(function (data) {
   vm.mentorships = data;
  });
 }

 vm.getMentorship(vm.mentorshipId);

};

mentorshipManageCtrl.$inject = [
 'MentorshipSrv',
 '$state',
 '$stateParams',
 '$http',
 '$q',
 '$rootScope'];

angular.module("app.mentorship").controller('MentorshipManageCtrl', mentorshipManageCtrl);
