var profileTimelinesCtrl = function (
        ProfileTimelinesManager,
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
 vm.profileId = $stateParams.profileId;
 vm.profileTimelinesCopy;
 vm.profileTimelinesManager = new ProfileTimelinesManager();
 vm.timelineFormDisplay = false;

 vm.defaultProfileTimelineData = {
  profileId: $stateParams.profileId,
  privacy: 0
 }
 vm.newProfileTimelineData = angular.copy(vm.defaultProfileTimelineData);

 vm.showTimelineForm = function () {
  vm.timelineFormDisplay = true;
 };

 vm.createProfileTimeline = function (data) {
  vm.profileTimelinesManager.createProfileTimeline(data).then(function (response) {
   vm.timelineFormDisplay = false;
   vm.newProfileTimelineData = angular.copy(vm.defaultProfileTimelineData);
   vm.profileTimelinesCopy = angular.copy(vm.profileTimelinesManager.profileTimelines);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editProfileTimeline = function (data) {
  vm.profileTimelinesManager.editProfileTimeline(data).then(function (response) {
   vm.timelineFormDisplay = false;
   vm.newProfileTimelineData = angular.copy(vm.defaultProfileTimelineData);
   vm.profileTimelinesCopy = angular.copy(vm.profileTimelinesManager.profileTimelines);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editProfileTimelineSections = {
  details: function (profileTimelineId, detail) {
   var profileTimelineData = {
    profileTimelineId: profileTimelineId,
    title: detail.title,
    description: detail.description
   };
   vm.editProfileTimeline(profileTimelineData);
  }
 }

 vm.cancelProfileTimeline = function (form) {
  vm.timelineFormDisplay = false;
  vm.newProfileTimelineData = angular.copy(vm.defaultProfileTimelineData)
  if (form) {
   form.$setPristine();
   form.$setUntouched();
  }
 };

 vm.revertProfileTimeline = function (profileTimeline, profileTimelineCopy) {
  profileTimeline = profileTimelineCopy;
  /*
   $filter('filter')
   (vm.profileTimelinesManager.profileTimelines, {id: profileTimelineId}, true)[0]
   = angular.copy($filter('filter')
   (vm.profileTimelinesCopy, {id: profileTimelineId}, true)[0]);
   if (profileTimeline.length && profileTimelineCopy.length) {
   // vm.profileTimelinesManager.profileTimelines angular.copy(vm.profileTimelinesCopy);
   }
   */
 };






 vm.editedTimeline = null;

 $scope.$watch(angular.bind(this, function () {
  return vm.profileTimelines;
 }), function () {
  //vm.remainingCount = filterFilter(profileTimelines, {completed: false}).length;
  vm.doneCount = vm.profileTimelinesManager.profileTimelines.length - vm.remainingCount;
  vm.allChecked = !vm.remainingCount;
  //ProfileTimelineService.put(vm.profileTimelines);
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




 vm.editTimeline = function (profileTimeline) {
  vm.editedTimeline = profileTimeline;
  // Clone the original profileTimeline to restore it on demand.
  vm.originalTimeline = angular.copy(profileTimeline);
 };


 vm.doneEditing = function (profileTimeline) {
  vm.editedTimeline = null;
  profileTimeline.title = profileTimeline.title.trim();

  if (!profileTimeline.title) {
   vm.removeTimeline(profileTimeline);
  }
 };

 vm.openProfileTimeline = function (profileTimeline) {
  var modalInstance = $uibModal.open({
   animation: true,
   templateUrl: 'profile-timeline-modal.html',
   controller: 'ProfileTimelineCtrl as profileTimelineCtrl',
   backdrop: 'static',
   size: 'xl',
   resolve: {
    profileTimelineData: function () {
     return profileTimeline;
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
 vm.profileTimelinesManager.getProfileTimelines(vm.profileId);
};

profileTimelinesCtrl.$inject = [
 'ProfileTimelinesManager',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$uibModal',
 '$log',
 '$filter'];

angular.module("app.profiles").controller('ProfileTimelinesCtrl', profileTimelinesCtrl);
