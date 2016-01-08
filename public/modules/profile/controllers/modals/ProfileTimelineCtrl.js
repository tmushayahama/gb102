var profileTimelineCtrl = function (
        ProfileTimelineManager,
        $uibModalInstance,
        $scope,
        $state,
        $stateParams,
        $http,
        $rootScope,
        $location,
        $log,
        profileTimelineData) {
 var vm = this;
 vm.profileId = profileTimelineData.profile_id;
 vm.profileTimelineId = profileTimelineData.id;
 vm.profileTimelineManager = new ProfileTimelineManager();


 vm.timelineId = profileTimelineData.timeline_id;

 vm.timelineFormDisplay = false;




 vm.ok = function () {
  $uibModalInstance.close();
 };

 vm.close = function () {
  $uibModalInstance.dismiss('cancel');
 };

 // vm.newProfileTimelineData = vm.defaultProfileTimelineData;

 vm.getProfileTimeline = function (profileId, timelineId) {
  vm.profileTimelineManager.getProfileTimeline(profileId, timelineId).then(function (response) {
  }, function (error) {
   console.log(error);
  });
 };

 vm.editProfileTimeline = function (data) {
  vm.profileTimelineManager.editProfileTimeline(data).then(function (response) {
  }, function (response) {
   console.log(response);
  });
 };

 vm.editProfileTimelineSections = {
  details: function (details) {
   var profileTimelineData = {
    profileTimelineId: vm.profileTimelineId,
    title: details.title,
    description: details.description
   };
   vm.editProfileTimeline(profileTimelineData);
  }
 }



 vm.showTimelineForm = function () {
  vm.timelineFormDisplay = true;
 };



 //--------init------
 vm.getProfileTimeline(vm.profileId, vm.timelineId);
};


profileTimelineCtrl.$inject = [
 'ProfileTimelineManager',
 '$uibModalInstance',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$log',
 'profileTimelineData'];

angular.module("app.profiles").controller('ProfileTimelineCtrl', profileTimelineCtrl);
