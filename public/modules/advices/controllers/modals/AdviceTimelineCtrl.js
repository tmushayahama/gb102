angular.module("app.advices").controller('AdviceTimelineCtrl',
        ['AdviceTimelineManager',
         '$uibModalInstance',
         '$scope',
         '$state',
         '$stateParams',
         '$http',
         '$rootScope',
         '$location',
         '$log',
         'adviceTimelineData',
         function (
                 AdviceTimelineManager,
                 $uibModalInstance,
                 $scope,
                 $state,
                 $stateParams,
                 $http,
                 $rootScope,
                 $location,
                 $log,
                 adviceTimelineData) {
          var vm = this;
          vm.adviceId = adviceTimelineData.advice_id;
          vm.adviceTimelineId = adviceTimelineData.id;
          vm.adviceTimelineManager = new AdviceTimelineManager();


          vm.timelineId = adviceTimelineData.timeline_id;

          vm.timelineFormDisplay = false;




          vm.ok = function () {
           $uibModalInstance.close();
          };

          vm.close = function () {
           $uibModalInstance.dismiss('cancel');
          };

          // vm.newAdviceTimelineData = vm.defaultAdviceTimelineData;

          vm.getAdviceTimeline = function (adviceId, timelineId) {
           vm.adviceTimelineManager.getAdviceTimeline(adviceId, timelineId).then(function (response) {
           }, function (error) {
            console.log(error);
           });
          };

          vm.editAdviceTimeline = function (data) {
           vm.adviceTimelineManager.editAdviceTimeline(data).then(function (response) {
           }, function (response) {
            console.log(response);
           });
          };

          vm.editAdviceTimelineSections = {
           details: function (details) {
            var adviceTimelineData = {
             adviceTimelineId: vm.adviceTimelineId,
             title: details.title,
             description: details.description
            };
            vm.editAdviceTimeline(adviceTimelineData);
           }
          }



          vm.showTimelineForm = function () {
           vm.timelineFormDisplay = true;
          };



          //--------init------
          vm.getAdviceTimeline(vm.adviceId, vm.timelineId);
         }
        ])