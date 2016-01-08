var exploreTimelineCtrl = function (
        ExploreTimelineManager,
        $uibModalInstance,
        $scope,
        $state,
        $stateParams,
        $http,
        $rootScope,
        $location,
        $log,
        exploreTimelineData) {
 var vm = this;
 vm.exploreId = exploreTimelineData.explore_id;
 vm.exploreTimelineId = exploreTimelineData.id;
 vm.exploreTimelineManager = new ExploreTimelineManager();


 vm.timelineId = exploreTimelineData.timeline_id;

 vm.timelineFormDisplay = false;




 vm.ok = function () {
  $uibModalInstance.close();
 };

 vm.close = function () {
  $uibModalInstance.dismiss('cancel');
 };

 // vm.newExploreTimelineData = vm.defaultExploreTimelineData;

 vm.getExploreTimeline = function (exploreId, timelineId) {
  vm.exploreTimelineManager.getExploreTimeline(exploreId, timelineId).then(function (response) {
  }, function (error) {
   console.log(error);
  });
 };

 vm.editExploreTimeline = function (data) {
  vm.exploreTimelineManager.editExploreTimeline(data).then(function (response) {
  }, function (response) {
   console.log(response);
  });
 };

 vm.editExploreTimelineSections = {
  details: function (details) {
   var exploreTimelineData = {
    exploreTimelineId: vm.exploreTimelineId,
    title: details.title,
    description: details.description
   };
   vm.editExploreTimeline(exploreTimelineData);
  }
 }



 vm.showTimelineForm = function () {
  vm.timelineFormDisplay = true;
 };



 //--------init------
 vm.getExploreTimeline(vm.exploreId, vm.timelineId);
};


exploreTimelineCtrl.$inject = [
 'ExploreTimelineManager',
 '$uibModalInstance',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$log',
 'exploreTimelineData'];

angular.module("app.explore").controller('ExploreTimelineCtrl', exploreTimelineCtrl);
