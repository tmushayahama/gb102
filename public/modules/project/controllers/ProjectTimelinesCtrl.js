var projectTimelinesCtrl = function (
        ProjectTimelinesManager,
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
 vm.projectId = $stateParams.projectId;
 vm.projectTimelinesCopy;
 vm.projectTimelinesManager = new ProjectTimelinesManager();
 vm.timelineFormDisplay = false;

 vm.defaultProjectTimelineData = {
  projectId: $stateParams.projectId,
  privacy: 0
 }
 vm.newProjectTimelineData = angular.copy(vm.defaultProjectTimelineData);

 vm.showTimelineForm = function () {
  vm.timelineFormDisplay = true;
 };

 vm.createProjectTimeline = function (data) {
  vm.projectTimelinesManager.createProjectTimeline(data).then(function (response) {
   vm.timelineFormDisplay = false;
   vm.newProjectTimelineData = angular.copy(vm.defaultProjectTimelineData);
   vm.projectTimelinesCopy = angular.copy(vm.projectTimelinesManager.projectTimelines);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editProjectTimeline = function (data) {
  vm.projectTimelinesManager.editProjectTimeline(data).then(function (response) {
   vm.timelineFormDisplay = false;
   vm.newProjectTimelineData = angular.copy(vm.defaultProjectTimelineData);
   vm.projectTimelinesCopy = angular.copy(vm.projectTimelinesManager.projectTimelines);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editProjectTimelineSections = {
  details: function (projectTimelineId, detail) {
   var projectTimelineData = {
    projectTimelineId: projectTimelineId,
    title: detail.title,
    description: detail.description
   };
   vm.editProjectTimeline(projectTimelineData);
  }
 }

 vm.cancelProjectTimeline = function (form) {
  vm.timelineFormDisplay = false;
  vm.newProjectTimelineData = angular.copy(vm.defaultProjectTimelineData)
  if (form) {
   form.$setPristine();
   form.$setUntouched();
  }
 };

 vm.revertProjectTimeline = function (projectTimeline, projectTimelineCopy) {
  projectTimeline = projectTimelineCopy;
  /*
   $filter('filter')
   (vm.projectTimelinesManager.projectTimelines, {id: projectTimelineId}, true)[0]
   = angular.copy($filter('filter')
   (vm.projectTimelinesCopy, {id: projectTimelineId}, true)[0]);
   if (projectTimeline.length && projectTimelineCopy.length) {
   // vm.projectTimelinesManager.projectTimelines angular.copy(vm.projectTimelinesCopy);
   }
   */
 };






 vm.editedTimeline = null;

 $scope.$watch(angular.bind(this, function () {
  return vm.projectTimelines;
 }), function () {
  //vm.remainingCount = filterFilter(projectTimelines, {completed: false}).length;
  vm.doneCount = vm.projectTimelinesManager.projectTimelines.length - vm.remainingCount;
  vm.allChecked = !vm.remainingCount;
  //ProjectTimelineService.put(vm.projectTimelines);
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




 vm.editTimeline = function (projectTimeline) {
  vm.editedTimeline = projectTimeline;
  // Clone the original projectTimeline to restore it on demand.
  vm.originalTimeline = angular.copy(projectTimeline);
 };


 vm.doneEditing = function (projectTimeline) {
  vm.editedTimeline = null;
  projectTimeline.title = projectTimeline.title.trim();

  if (!projectTimeline.title) {
   vm.removeTimeline(projectTimeline);
  }
 };

 vm.openProjectTimeline = function (projectTimeline) {
  var modalInstance = $uibModal.open({
   animation: true,
   templateUrl: 'project-timeline-modal.html',
   controller: 'ProjectTimelineCtrl as projectTimelineCtrl',
   backdrop: 'static',
   size: 'xl',
   resolve: {
    projectTimelineData: function () {
     return projectTimeline;
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
 vm.projectTimelinesManager.getProjectTimelines(vm.projectId);
};

projectTimelinesCtrl.$inject = [
 'ProjectTimelinesManager',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$uibModal',
 '$log',
 '$filter'];

angular.module("app.project").controller('ProjectTimelinesCtrl', projectTimelinesCtrl);
