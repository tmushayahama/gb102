var promiseTimelineCtrl = function (
        PromiseTimelineManager,
        $uibModalInstance,
        $scope,
        $state,
        $stateParams,
        $http,
        $rootScope,
        $location,
        $log,
        promiseTimelineData) {
 var vm = this;
 vm.promiseId = promiseTimelineData.promise_id;
 vm.promiseTimelineId = promiseTimelineData.id;
 vm.promiseTimelineManager = new PromiseTimelineManager();


 vm.timelineId = promiseTimelineData.timeline_id;

 vm.timelineFormDisplay = false;




 vm.ok = function () {
  $uibModalInstance.close();
 };

 vm.close = function () {
  $uibModalInstance.dismiss('cancel');
 };

 // vm.newPromiseTimelineData = vm.defaultPromiseTimelineData;

 vm.getPromiseTimeline = function (promiseId, timelineId) {
  vm.promiseTimelineManager.getPromiseTimeline(promiseId, timelineId).then(function (response) {
  }, function (error) {
   console.log(error);
  });
 };

 vm.editPromiseTimeline = function (data) {
  vm.promiseTimelineManager.editPromiseTimeline(data).then(function (response) {
  }, function (response) {
   console.log(response);
  });
 };

 vm.editPromiseTimelineSections = {
  details: function (details) {
   var promiseTimelineData = {
    promiseTimelineId: vm.promiseTimelineId,
    title: details.title,
    description: details.description
   };
   vm.editPromiseTimeline(promiseTimelineData);
  }
 }



 vm.showTimelineForm = function () {
  vm.timelineFormDisplay = true;
 };



 //--------init------
 vm.getPromiseTimeline(vm.promiseId, vm.timelineId);
};


promiseTimelineCtrl.$inject = [
 'PromiseTimelineManager',
 '$uibModalInstance',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$log',
 'promiseTimelineData'];

angular.module("app.promises").controller('PromiseTimelineCtrl', promiseTimelineCtrl);
