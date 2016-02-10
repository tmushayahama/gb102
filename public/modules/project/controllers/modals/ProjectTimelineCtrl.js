var projectTimelineCtrl = function (
        ProjectTimelineManager,
        $uibModalInstance,
        $scope,
        $state,
        $stateParams,
        $http,
        $rootScope,
        $location,
        $log,
        projectTimelineData) {
 var vm = this;
 vm.projectId = projectTimelineData.project_id;
 vm.projectTimelineId = projectTimelineData.id;
 vm.projectTimelineManager = new ProjectTimelineManager();


 vm.timelineId = projectTimelineData.timeline_id;

 vm.timelineFormDisplay = false;




 vm.ok = function () {
  $uibModalInstance.close();
 };

 vm.close = function () {
  $uibModalInstance.dismiss('cancel');
 };

 // vm.newProjectTimelineData = vm.defaultProjectTimelineData;

 vm.getProjectTimeline = function (projectId, timelineId) {
  vm.projectTimelineManager.getProjectTimeline(projectId, timelineId).then(function (response) {
  }, function (error) {
   console.log(error);
  });
 };

 vm.editProjectTimeline = function (data) {
  vm.projectTimelineManager.editProjectTimeline(data).then(function (response) {
  }, function (response) {
   console.log(response);
  });
 };

 vm.editProjectTimelineSections = {
  details: function (details) {
   var projectTimelineData = {
    projectTimelineId: vm.projectTimelineId,
    title: details.title,
    description: details.description
   };
   vm.editProjectTimeline(projectTimelineData);
  }
 }



 vm.showTimelineForm = function () {
  vm.timelineFormDisplay = true;
 };



 //--------init------
 vm.getProjectTimeline(vm.projectId, vm.timelineId);
};


projectTimelineCtrl.$inject = [
 'ProjectTimelineManager',
 '$uibModalInstance',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$log',
 'projectTimelineData'];

angular.module("app.project").controller('ProjectTimelineCtrl', projectTimelineCtrl);
