angular.module("app.hobbys").controller('HobbyTimelineCtrl',
        ['HobbyTimelineManager',
         '$uibModalInstance',
         '$scope',
         '$state',
         '$stateParams',
         '$http',
         '$rootScope',
         '$location',
         '$log',
         'hobbyTimelineData',
         function (
                 HobbyTimelineManager,
                 $uibModalInstance,
                 $scope,
                 $state,
                 $stateParams,
                 $http,
                 $rootScope,
                 $location,
                 $log,
                 hobbyTimelineData) {
          var vm = this;
          vm.hobbyId = hobbyTimelineData.hobby_id;
          vm.hobbyTimelineId = hobbyTimelineData.id;
          vm.hobbyTimelineManager = new HobbyTimelineManager();


          vm.timelineId = hobbyTimelineData.timeline_id;

          vm.timelineFormDisplay = false;




          vm.ok = function () {
           $uibModalInstance.close();
          };

          vm.close = function () {
           $uibModalInstance.dismiss('cancel');
          };

          // vm.newHobbyTimelineData = vm.defaultHobbyTimelineData;

          vm.getHobbyTimeline = function (hobbyId, timelineId) {
           vm.hobbyTimelineManager.getHobbyTimeline(hobbyId, timelineId).then(function (response) {
           }, function (error) {
            console.log(error);
           });
          };

          vm.editHobbyTimeline = function (data) {
           vm.hobbyTimelineManager.editHobbyTimeline(data).then(function (response) {
           }, function (response) {
            console.log(response);
           });
          };

          vm.editHobbyTimelineSections = {
           details: function (details) {
            var hobbyTimelineData = {
             hobbyTimelineId: vm.hobbyTimelineId,
             title: details.title,
             description: details.description
            };
            vm.editHobbyTimeline(hobbyTimelineData);
           }
          }



          vm.showTimelineForm = function () {
           vm.timelineFormDisplay = true;
          };



          //--------init------
          vm.getHobbyTimeline(vm.hobbyId, vm.timelineId);
         }
        ])