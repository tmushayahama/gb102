angular.module("app.hobbys").controller('HobbyTimelinesCtrl',
        ['HobbyTimelinesManager',
         '$scope',
         '$state',
         '$stateParams',
         '$http',
         '$rootScope',
         '$location',
         '$uibModal',
         '$log',
         '$filter',
         function (
                 HobbyTimelinesManager,
                 $scope,
                 $state,
                 $stateParams,
                 $http,
                 $rootScope,
                 $location,
                 $uibModal,
                 $log,
                 $filter) {

          var vm = this;
          vm.hobbyId = $stateParams.hobbyId;
          vm.hobbyTimelinesCopy;
          vm.hobbyTimelinesManager = new HobbyTimelinesManager();
          vm.timelineFormDisplay = false;

          vm.defaultHobbyTimelineData = {
           hobbyId: $stateParams.hobbyId,
           privacy: 0
          }
          vm.newHobbyTimelineData = angular.copy(vm.defaultHobbyTimelineData);

          vm.showTimelineForm = function () {
           vm.timelineFormDisplay = true;
          };

          vm.createHobbyTimeline = function (data) {
           vm.hobbyTimelinesManager.createHobbyTimeline(data).then(function (response) {
            vm.timelineFormDisplay = false;
            vm.newHobbyTimelineData = angular.copy(vm.defaultHobbyTimelineData);
            vm.hobbyTimelinesCopy = angular.copy(vm.hobbyTimelinesManager.hobbyTimelines);
           }, function (response) {
            console.log(response);
           });
          };

          vm.editHobbyTimeline = function (data) {
           vm.hobbyTimelinesManager.editHobbyTimeline(data).then(function (response) {
            vm.timelineFormDisplay = false;
            vm.newHobbyTimelineData = angular.copy(vm.defaultHobbyTimelineData);
            vm.hobbyTimelinesCopy = angular.copy(vm.hobbyTimelinesManager.hobbyTimelines);
           }, function (response) {
            console.log(response);
           });
          };

          vm.editHobbyTimelineSections = {
           details: function (hobbyTimelineId, detail) {
            var hobbyTimelineData = {
             hobbyTimelineId: hobbyTimelineId,
             title: detail.title,
             description: detail.description
            };
            vm.editHobbyTimeline(hobbyTimelineData);
           }
          }

          vm.cancelHobbyTimeline = function (form) {
           vm.timelineFormDisplay = false;
           vm.newHobbyTimelineData = angular.copy(vm.defaultHobbyTimelineData)
           if (form) {
            form.$setPristine();
            form.$setUntouched();
           }
          };

          vm.revertHobbyTimeline = function (hobbyTimeline, hobbyTimelineCopy) {
           hobbyTimeline = hobbyTimelineCopy;
           /*
            $filter('filter')
            (vm.hobbyTimelinesManager.hobbyTimelines, {id: hobbyTimelineId}, true)[0]
            = angular.copy($filter('filter')
            (vm.hobbyTimelinesCopy, {id: hobbyTimelineId}, true)[0]);
            if (hobbyTimeline.length && hobbyTimelineCopy.length) {
            // vm.hobbyTimelinesManager.hobbyTimelines angular.copy(vm.hobbyTimelinesCopy);
            }
            */
          };






          vm.editedTimeline = null;

          $scope.$watch(angular.bind(this, function () {
           return vm.hobbyTimelines;
          }), function () {
           //vm.remainingCount = filterFilter(hobbyTimelines, {completed: false}).length;
           vm.doneCount = vm.hobbyTimelinesManager.hobbyTimelines.length - vm.remainingCount;
           vm.allChecked = !vm.remainingCount;
           //HobbyTimelineService.put(vm.hobbyTimelines);
          }, true);
          /*
           $scope.$watch(angular.bind(this, function () {
           return vm.location.path();
           }), function (path) {
           vm.statusFilter = (path === '/active') ?
           {completed: false} : (path === '/completed') ?
           {completed: true} : null;
           });
           */




          vm.editTimeline = function (hobbyTimeline) {
           vm.editedTimeline = hobbyTimeline;
           // Clone the original hobbyTimeline to restore it on demand.
           vm.originalTimeline = angular.copy(hobbyTimeline);
          };


          vm.doneEditing = function (hobbyTimeline) {
           vm.editedTimeline = null;
           hobbyTimeline.title = hobbyTimeline.title.trim();

           if (!hobbyTimeline.title) {
            vm.removeTimeline(hobbyTimeline);
           }
          };

          vm.openHobbyTimeline = function (hobbyTimeline) {
           var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'hobby-timeline-modal.html',
            controller: 'HobbyTimelineCtrl as hobbyTimelineCtrl',
            backdrop: 'static',
            size: 'xl',
            resolve: {
             hobbyTimelineData: function () {
              return hobbyTimeline;
             }
            }
           });

           modalInstance.result.then(function (selectedItem) {
            $scope.selected = selectedItem;
           }, function () {
            $log.info('Modal dismissed at: ' + new Date());
           });
          };



          //--------init------
          vm.hobbyTimelinesManager.getHobbyTimelines(vm.hobbyId);
         }
        ])