var groupTimelineCtrl = function (
        GroupTimelineManager,
        $uibModalInstance,
        $scope,
        $state,
        $stateParams,
        $http,
        $rootScope,
        $location,
        $log,
        groupTimelineData) {
 var vm = this;
 vm.groupId = groupTimelineData.group_id;
 vm.groupTimelineId = groupTimelineData.id;
 vm.groupTimelineManager = new GroupTimelineManager();


 vm.timelineId = groupTimelineData.timeline_id;

 vm.timelineFormDisplay = false;




 vm.ok = function () {
  $uibModalInstance.close();
 };

 vm.close = function () {
  $uibModalInstance.dismiss('cancel');
 };

 // vm.newGroupTimelineData = vm.defaultGroupTimelineData;

 vm.getGroupTimeline = function (groupId, timelineId) {
  vm.groupTimelineManager.getGroupTimeline(groupId, timelineId).then(function (response) {
  }, function (error) {
   console.log(error);
  });
 };

 vm.editGroupTimeline = function (data) {
  vm.groupTimelineManager.editGroupTimeline(data).then(function (response) {
  }, function (response) {
   console.log(response);
  });
 };

 vm.editGroupTimelineSections = {
  details: function (details) {
   var groupTimelineData = {
    groupTimelineId: vm.groupTimelineId,
    title: details.title,
    description: details.description
   };
   vm.editGroupTimeline(groupTimelineData);
  }
 }



 vm.showTimelineForm = function () {
  vm.timelineFormDisplay = true;
 };



 //--------init------
 vm.getGroupTimeline(vm.groupId, vm.timelineId);
};


groupTimelineCtrl.$inject = [
 'GroupTimelineManager',
 '$uibModalInstance',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$log',
 'groupTimelineData'];

angular.module("app.groups").controller('GroupTimelineCtrl', groupTimelineCtrl);
