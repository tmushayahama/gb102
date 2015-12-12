angular.module("app.skills").controller('SkillTimelinesCtrl',
        ['SkillTimelinesManager',
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
                 SkillTimelinesManager,
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
          vm.skillId = $stateParams.skillId;
          vm.skillTimelinesCopy;
          vm.skillTimelinesManager = new SkillTimelinesManager();
          vm.timelineFormDisplay = false;

          vm.defaultSkillTimelineData = {
           skillId: $stateParams.skillId,
           privacy: 0
          }
          vm.newSkillTimelineData = angular.copy(vm.defaultSkillTimelineData);

          vm.showTimelineForm = function () {
           vm.timelineFormDisplay = true;
          };

          vm.createSkillTimeline = function (data) {
           vm.skillTimelinesManager.createSkillTimeline(data).then(function (response) {
            vm.timelineFormDisplay = false;
            vm.newSkillTimelineData = angular.copy(vm.defaultSkillTimelineData);
            vm.skillTimelinesCopy = angular.copy(vm.skillTimelinesManager.skillTimelines);
           }, function (response) {
            console.log(response);
           });
          };

          vm.editSkillTimeline = function (data) {
           vm.skillTimelinesManager.editSkillTimeline(data).then(function (response) {
            vm.timelineFormDisplay = false;
            vm.newSkillTimelineData = angular.copy(vm.defaultSkillTimelineData);
            vm.skillTimelinesCopy = angular.copy(vm.skillTimelinesManager.skillTimelines);
           }, function (response) {
            console.log(response);
           });
          };

          vm.editSkillTimelineSections = {
           details: function (skillTimelineId, detail) {
            var skillTimelineData = {
             skillTimelineId: skillTimelineId,
             title: detail.title,
             description: detail.description
            };
            vm.editSkillTimeline(skillTimelineData);
           }
          }

          vm.cancelSkillTimeline = function (form) {
           vm.timelineFormDisplay = false;
           vm.newSkillTimelineData = angular.copy(vm.defaultSkillTimelineData)
           if (form) {
            form.$setPristine();
            form.$setUntouched();
           }
          };

          vm.revertSkillTimeline = function (skillTimeline, skillTimelineCopy) {
           skillTimeline = skillTimelineCopy;
           /*
            $filter('filter')
            (vm.skillTimelinesManager.skillTimelines, {id: skillTimelineId}, true)[0]
            = angular.copy($filter('filter')
            (vm.skillTimelinesCopy, {id: skillTimelineId}, true)[0]);
            if (skillTimeline.length && skillTimelineCopy.length) {
            // vm.skillTimelinesManager.skillTimelines angular.copy(vm.skillTimelinesCopy);
            }
            */
          };






          vm.editedTimeline = null;

          $scope.$watch(angular.bind(this, function () {
           return vm.skillTimelines;
          }), function () {
           //vm.remainingCount = filterFilter(skillTimelines, {completed: false}).length;
           vm.doneCount = vm.skillTimelinesManager.skillTimelines.length - vm.remainingCount;
           vm.allChecked = !vm.remainingCount;
           //SkillTimelineService.put(vm.skillTimelines);
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




          vm.editTimeline = function (skillTimeline) {
           vm.editedTimeline = skillTimeline;
           // Clone the original skillTimeline to restore it on demand.
           vm.originalTimeline = angular.copy(skillTimeline);
          };


          vm.doneEditing = function (skillTimeline) {
           vm.editedTimeline = null;
           skillTimeline.title = skillTimeline.title.trim();

           if (!skillTimeline.title) {
            vm.removeTimeline(skillTimeline);
           }
          };

          vm.openSkillTimeline = function (skillTimeline) {
           var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'skill-timeline-modal.html',
            controller: 'SkillTimelineCtrl as skillTimelineCtrl',
            backdrop: 'static',
            size: 'xl',
            resolve: {
             skillTimelineData: function () {
              return skillTimeline;
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
          vm.skillTimelinesManager.getSkillTimelines(vm.skillId);
         }
        ])