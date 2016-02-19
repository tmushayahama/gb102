var mentorshipProgressCtrl = function (
        MentorshipProgressManager,
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
 vm.mentorshipId = $stateParams.mentorshipId;
 vm.mentorshipProgressCopy;
 vm.mentorshipProgressManager = new MentorshipProgressManager();
 vm.progressFormDisplay = false;

 vm.defaultMentorshipProgressData = {
  mentorshipId: $stateParams.mentorshipId,
  privacy: 0
 }
 vm.newMentorshipProgressData = angular.copy(vm.defaultMentorshipProgressData);

 vm.showProgressForm = function () {
  vm.progressFormDisplay = true;
 };

 vm.createMentorshipProgress = function (data) {
  vm.mentorshipProgressManager.createMentorshipProgress(data).then(function (response) {
   vm.progressFormDisplay = false;
   vm.newMentorshipProgressData = angular.copy(vm.defaultMentorshipProgressData);
   vm.mentorshipProgressCopy = angular.copy(vm.mentorshipProgressManager.mentorshipProgress);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editMentorshipProgress = function (data) {
  vm.mentorshipProgressManager.editMentorshipProgress(data).then(function (response) {
   vm.progressFormDisplay = false;
   vm.newMentorshipProgressData = angular.copy(vm.defaultMentorshipProgressData);
   vm.mentorshipProgressCopy = angular.copy(vm.mentorshipProgressManager.mentorshipProgress);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editMentorshipProgressSections = {
  details: function (mentorshipProgressId, detail) {
   var mentorshipProgressData = {
    mentorshipProgressId: mentorshipProgressId,
    title: detail.title,
    description: detail.description
   };
   vm.editMentorshipProgress(mentorshipProgressData);
  }
 }

 vm.cancelMentorshipProgress = function (form) {
  vm.progressFormDisplay = false;
  vm.newMentorshipProgressData = angular.copy(vm.defaultMentorshipProgressData)
  if (form) {
   form.$setPristine();
   form.$setUntouched();
  }
 };

 vm.revertMentorshipProgress = function (mentorshipProgress, mentorshipProgressCopy) {
  mentorshipProgress = mentorshipProgressCopy;
  /*
   $filter('filter')
   (vm.mentorshipProgressManager.mentorshipProgress, {id: mentorshipProgressId}, true)[0]
   = angular.copy($filter('filter')
   (vm.mentorshipProgressCopy, {id: mentorshipProgressId}, true)[0]);
   if (mentorshipProgress.length && mentorshipProgressCopy.length) {
   // vm.mentorshipProgressManager.mentorshipProgress angular.copy(vm.mentorshipProgressCopy);
   }
   */
 };






 vm.editedProgress = null;

 $scope.$watch(angular.bind(this, function () {
  return vm.mentorshipProgress;
 }), function () {
  //vm.remainingCount = filterFilter(mentorshipProgress, {completed: false}).length;
  vm.doneCount = vm.mentorshipProgressManager.mentorshipProgress.length - vm.remainingCount;
  vm.allChecked = !vm.remainingCount;
  //MentorshipProgressService.put(vm.mentorshipProgress);
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




 vm.editProgress = function (mentorshipProgress) {
  vm.editedProgress = mentorshipProgress;
  // Clone the original mentorshipProgress to restore it on demand.
  vm.originalProgress = angular.copy(mentorshipProgress);
 };


 vm.doneEditing = function (mentorshipProgress) {
  vm.editedProgress = null;
  mentorshipProgress.title = mentorshipProgress.title.trim();

  if (!mentorshipProgress.title) {
   vm.removeProgress(mentorshipProgress);
  }
 };

 vm.openMentorshipProgress = function (mentorshipProgress) {
  var modalInstance = $uibModal.open({
   animation: true,
   templateUrl: 'mentorship-progress-modal.html',
   controller: 'MentorshipProgressCtrl as mentorshipProgressCtrl',
   backdrop: 'static',
   size: 'xl',
   resolve: {
    mentorshipProgressData: function () {
     return mentorshipProgress;
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
 vm.mentorshipProgressManager.getMentorshipProgress(vm.mentorshipId);
};

mentorshipProgressCtrl.$inject = [
 'MentorshipProgressManager',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$uibModal',
 '$log',
 '$filter'];

angular.module("app.mentorship").controller('MentorshipProgressCtrl', mentorshipProgressCtrl);
