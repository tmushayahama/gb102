var mentorshipManageCtrl = function (
        MentorshipManager,
        $state,
        $stateParams,
        $http,
        $q,
        $rootScope) {
 var vm = this;
 vm.mentorshipId = $stateParams.mentorshipId;
 vm.mentorships;
 vm.mentorshipManager = new MentorshipManager();

 vm.getMentorship = function (id) {
  vm.mentorshipManager.getMentorship(id).then(function (data) {
   vm.mentorship = data;
   vm.getSubMentorships(vm.mentorship.explore_id);
  });
 };

 vm.getSubMentorships = function (exploreId) {
  vm.mentorshipManager.getSubMentorships(exploreId).then(function (data) {
   vm.mentorships = data;
  });
 }

 vm.getMentorship(vm.mentorshipId);

};

mentorshipManageCtrl.$inject = [
 'MentorshipManager',
 '$state',
 '$stateParams',
 '$http',
 '$q',
 '$rootScope'];

angular.module("app.mentorship").controller('MentorshipManageCtrl', mentorshipManageCtrl);
