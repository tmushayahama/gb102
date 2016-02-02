var collaborationTimelineCtrl = function (
        CollaborationTimelineManager,
        $uibModalInstance,
        $scope,
        $state,
        $stateParams,
        $http,
        $rootScope,
        $location,
        $log,
        collaborationTimelineData) {
 var vm = this;
 vm.collaborationId = collaborationTimelineData.collaboration_id;
 vm.collaborationTimelineId = collaborationTimelineData.id;
 vm.collaborationTimelineManager = new CollaborationTimelineManager();


 vm.timelineId = collaborationTimelineData.timeline_id;

 vm.timelineFormDisplay = false;




 vm.ok = function () {
  $uibModalInstance.close();
 };

 vm.close = function () {
  $uibModalInstance.dismiss('cancel');
 };

 // vm.newCollaborationTimelineData = vm.defaultCollaborationTimelineData;

 vm.getCollaborationTimeline = function (collaborationId, timelineId) {
  vm.collaborationTimelineManager.getCollaborationTimeline(collaborationId, timelineId).then(function (response) {
  }, function (error) {
   console.log(error);
  });
 };

 vm.editCollaborationTimeline = function (data) {
  vm.collaborationTimelineManager.editCollaborationTimeline(data).then(function (response) {
  }, function (response) {
   console.log(response);
  });
 };

 vm.editCollaborationTimelineSections = {
  details: function (details) {
   var collaborationTimelineData = {
    collaborationTimelineId: vm.collaborationTimelineId,
    title: details.title,
    description: details.description
   };
   vm.editCollaborationTimeline(collaborationTimelineData);
  }
 }



 vm.showTimelineForm = function () {
  vm.timelineFormDisplay = true;
 };



 //--------init------
 vm.getCollaborationTimeline(vm.collaborationId, vm.timelineId);
};


collaborationTimelineCtrl.$inject = [
 'CollaborationTimelineManager',
 '$uibModalInstance',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$log',
 'collaborationTimelineData'];

angular.module("app.collaboration").controller('CollaborationTimelineCtrl', collaborationTimelineCtrl);
