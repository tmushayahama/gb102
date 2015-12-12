angular.module("app.mentorships").controller('MentorshipWeblinkCtrl',
        ['MentorshipWeblinkManager',
         '$uibModalInstance',
         '$scope',
         '$state',
         '$stateParams',
         '$http',
         '$rootScope',
         '$location',
         '$log',
         'mentorshipWeblinkData',
         function (
                 MentorshipWeblinkManager,
                 $uibModalInstance,
                 $scope,
                 $state,
                 $stateParams,
                 $http,
                 $rootScope,
                 $location,
                 $log,
                 mentorshipWeblinkData) {
          var vm = this;
          vm.mentorshipId = mentorshipWeblinkData.mentorship_id;
          vm.mentorshipWeblinkId = mentorshipWeblinkData.id;
          vm.mentorshipWeblinkManager = new MentorshipWeblinkManager();


          vm.weblinkId = mentorshipWeblinkData.weblink_id;

          vm.weblinkFormDisplay = false;




          vm.ok = function () {
           $uibModalInstance.close();
          };

          vm.close = function () {
           $uibModalInstance.dismiss('cancel');
          };

          // vm.newMentorshipWeblinkData = vm.defaultMentorshipWeblinkData;

          vm.getMentorshipWeblink = function (mentorshipId, weblinkId) {
           vm.mentorshipWeblinkManager.getMentorshipWeblink(mentorshipId, weblinkId).then(function (response) {
           }, function (error) {
            console.log(error);
           });
          };

          vm.editMentorshipWeblink = function (data) {
           vm.mentorshipWeblinkManager.editMentorshipWeblink(data).then(function (response) {
           }, function (response) {
            console.log(response);
           });
          };

          vm.editMentorshipWeblinkSections = {
           details: function (details) {
            var mentorshipWeblinkData = {
             mentorshipWeblinkId: vm.mentorshipWeblinkId,
             title: details.title,
             description: details.description
            };
            vm.editMentorshipWeblink(mentorshipWeblinkData);
           }
          }



          vm.showWeblinkForm = function () {
           vm.weblinkFormDisplay = true;
          };



          //--------init------
          vm.getMentorshipWeblink(vm.mentorshipId, vm.weblinkId);
         }
        ])