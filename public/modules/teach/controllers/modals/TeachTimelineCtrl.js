var teachTimelineCtrl = function (
        TeachTimelineManager,
        $uibModalInstance,
        $scope,
        $state,
        $stateParams,
        $http,
        $rootScope,
        $location,
        $log,
        teachTimelineData) {
 var vm = this;
 vm.teachId = teachTimelineData.teach_id;
 vm.teachTimelineId = teachTimelineData.id;
 vm.teachTimelineManager = new TeachTimelineManager();


 vm.progressId = teachTimelineData.progress_id;

 vm.progressFormDisplay = false;




 vm.ok = function () {
  $uibModalInstance.close();
 };

 vm.close = function () {
  $uibModalInstance.dismiss('cancel');
 };

 // vm.newTeachTimelineData = vm.defaultTeachTimelineData;

 vm.getTeachTimeline = function (teachId, progressId) {
  vm.teachTimelineManager.getTeachTimeline(teachId, progressId).then(function (response) {
  }, function (error) {
   console.log(error);
  });
 };

 vm.editTeachTimeline = function (data) {
  vm.teachTimelineManager.editTeachTimeline(data).then(function (response) {
  }, function (response) {
   console.log(response);
  });
 };

 vm.editTeachTimelineSections = {
  details: function (details) {
   var teachTimelineData = {
    teachTimelineId: vm.teachTimelineId,
    title: details.title,
    description: details.description
   };
   vm.editTeachTimeline(teachTimelineData);
  }
 }



 vm.showTimelineForm = function () {
  vm.progressFormDisplay = true;
 };



 //--------init------
 vm.getTeachTimeline(vm.teachId, vm.progressId);
};


teachTimelineCtrl.$inject = [
 'TeachTimelineManager',
 '$uibModalInstance',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$log',
 'teachTimelineData'];

angular.module("app.teach").controller('TeachTimelineCtrl', teachTimelineCtrl);
