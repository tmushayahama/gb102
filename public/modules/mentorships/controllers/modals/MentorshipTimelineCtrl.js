angular.module("app.mentorships").controller('MentorshipTimelineCtrl',
        ['MentorshipTimelineManager',
         '$uibModalInstance',
         '$scope',
         '$state',
         '$stateParams',
         '$http',
         '$rootScope',
         '$location',
         '$log',
         'mentorshipTimelineData',
         function (
                 MentorshipTimelineManager,
                 $uibModalInstance,
                 $scope,
                 $state,
                 $stateParams,
                 $http,
                 $rootScope,
                 $location,
                 $log,
                 mentorshipTimelineData) {
          var vm = this;
          vm.mentorshipId = mentorshipTimelineData.mentorship_id;
          vm.mentorshipTimelineId = mentorshipTimelineData.id;
          vm.mentorshipTimelineManager = new MentorshipTimelineManager();


          vm.timelineId = mentorshipTimelineData.timeline_id;

          vm.timelineFormDisplay = false;




          vm.ok = function () {
           $uibModalInstance.close();
          };

          vm.close = function () {
           $uibModalInstance.dismiss('cancel');
          };

          // vm.newMentorshipTimelineData = vm.defaultMentorshipTimelineData;

          vm.getMentorshipTimeline = function (mentorshipId, timelineId) {
           vm.mentorshipTimelineManager.getMentorshipTimeline(mentorshipId, timelineId).then(function (response) {
           }, function (error) {
            console.log(error);
           });
          };

          vm.editMentorshipTimeline = function (data) {
           vm.mentorshipTimelineManager.editMentorshipTimeline(data).then(function (response) {
           }, function (response) {
            console.log(response);
           });
          };

          vm.editMentorshipTimelineSections = {
           details: function (details) {
            var mentorshipTimelineData = {
             mentorshipTimelineId: vm.mentorshipTimelineId,
             title: details.title,
             description: details.description
            };
            vm.editMentorshipTimeline(mentorshipTimelineData);
           }
          }



          vm.showTimelineForm = function () {
           vm.timelineFormDisplay = true;
          };



          //--------init------
          vm.getMentorshipTimeline(vm.mentorshipId, vm.timelineId);
         }
        ])