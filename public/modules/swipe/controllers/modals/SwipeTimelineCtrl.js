var swipeTimelineCtrl = function (
        SwipeTimelineManager,
        $uibModalInstance,
        $scope,
        $state,
        $stateParams,
        $http,
        $rootScope,
        $location,
        $log,
        swipeTimelineData) {
 var vm = this;
 vm.swipeId = swipeTimelineData.swipe_id;
 vm.swipeTimelineId = swipeTimelineData.id;
 vm.swipeTimelineManager = new SwipeTimelineManager();


 vm.timelineId = swipeTimelineData.timeline_id;

 vm.timelineFormDisplay = false;




 vm.ok = function () {
  $uibModalInstance.close();
 };

 vm.close = function () {
  $uibModalInstance.dismiss('cancel');
 };

 // vm.newSwipeTimelineData = vm.defaultSwipeTimelineData;

 vm.getSwipeTimeline = function (swipeId, timelineId) {
  vm.swipeTimelineManager.getSwipeTimeline(swipeId, timelineId).then(function (response) {
  }, function (error) {
   console.log(error);
  });
 };

 vm.editSwipeTimeline = function (data) {
  vm.swipeTimelineManager.editSwipeTimeline(data).then(function (response) {
  }, function (response) {
   console.log(response);
  });
 };

 vm.editSwipeTimelineSections = {
  details: function (details) {
   var swipeTimelineData = {
    swipeTimelineId: vm.swipeTimelineId,
    title: details.title,
    description: details.description
   };
   vm.editSwipeTimeline(swipeTimelineData);
  }
 }



 vm.showTimelineForm = function () {
  vm.timelineFormDisplay = true;
 };



 //--------init------
 vm.getSwipeTimeline(vm.swipeId, vm.timelineId);
};


swipeTimelineCtrl.$inject = [
 'SwipeTimelineManager',
 '$uibModalInstance',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$log',
 'swipeTimelineData'];

angular.module("app.swipe").controller('SwipeTimelineCtrl', swipeTimelineCtrl);
