var communityTimelineCtrl = function (
        CommunityTimelineManager,
        $uibModalInstance,
        $scope,
        $state,
        $stateParams,
        $http,
        $rootScope,
        $location,
        $log,
        communityTimelineData) {
 var vm = this;
 vm.communityId = communityTimelineData.community_id;
 vm.communityTimelineId = communityTimelineData.id;
 vm.communityTimelineManager = new CommunityTimelineManager();


 vm.timelineId = communityTimelineData.timeline_id;

 vm.timelineFormDisplay = false;




 vm.ok = function () {
  $uibModalInstance.close();
 };

 vm.close = function () {
  $uibModalInstance.dismiss('cancel');
 };

 // vm.newCommunityTimelineData = vm.defaultCommunityTimelineData;

 vm.getCommunityTimeline = function (communityId, timelineId) {
  vm.communityTimelineManager.getCommunityTimeline(communityId, timelineId).then(function (response) {
  }, function (error) {
   console.log(error);
  });
 };

 vm.editCommunityTimeline = function (data) {
  vm.communityTimelineManager.editCommunityTimeline(data).then(function (response) {
  }, function (response) {
   console.log(response);
  });
 };

 vm.editCommunityTimelineSections = {
  details: function (details) {
   var communityTimelineData = {
    communityTimelineId: vm.communityTimelineId,
    title: details.title,
    description: details.description
   };
   vm.editCommunityTimeline(communityTimelineData);
  }
 }



 vm.showTimelineForm = function () {
  vm.timelineFormDisplay = true;
 };



 //--------init------
 vm.getCommunityTimeline(vm.communityId, vm.timelineId);
};


communityTimelineCtrl.$inject = [
 'CommunityTimelineManager',
 '$uibModalInstance',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$log',
 'communityTimelineData'];

angular.module("app.communitys").controller('CommunityTimelineCtrl', communityTimelineCtrl);
