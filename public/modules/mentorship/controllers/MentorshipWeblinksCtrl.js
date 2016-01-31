var mentorshipWeblinksCtrl = function (
        MentorshipWeblinksManager,
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
 vm.mentorshipWeblinksCopy;
 vm.mentorshipWeblinksManager = new MentorshipWeblinksManager();
 vm.weblinkFormDisplay = false;

 vm.defaultMentorshipWeblinkData = {
  mentorshipId: $stateParams.mentorshipId,
  privacy: 0
 }
 vm.newMentorshipWeblinkData = angular.copy(vm.defaultMentorshipWeblinkData);

 vm.showWeblinkForm = function () {
  vm.weblinkFormDisplay = true;
 };

 vm.createMentorshipWeblink = function (data) {
  vm.mentorshipWeblinksManager.createMentorshipWeblink(data).then(function (response) {
   vm.weblinkFormDisplay = false;
   vm.newMentorshipWeblinkData = angular.copy(vm.defaultMentorshipWeblinkData);
   vm.mentorshipWeblinksCopy = angular.copy(vm.mentorshipWeblinksManager.mentorshipWeblinks);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editMentorshipWeblink = function (data) {
  vm.mentorshipWeblinksManager.editMentorshipWeblink(data).then(function (response) {
   vm.weblinkFormDisplay = false;
   vm.newMentorshipWeblinkData = angular.copy(vm.defaultMentorshipWeblinkData);
   vm.mentorshipWeblinksCopy = angular.copy(vm.mentorshipWeblinksManager.mentorshipWeblinks);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editMentorshipWeblinkSections = {
  details: function (mentorshipWeblinkId, detail) {
   var mentorshipWeblinkData = {
    mentorshipWeblinkId: mentorshipWeblinkId,
    title: detail.title,
    description: detail.description
   };
   vm.editMentorshipWeblink(mentorshipWeblinkData);
  }
 }

 vm.cancelMentorshipWeblink = function (form) {
  vm.weblinkFormDisplay = false;
  vm.newMentorshipWeblinkData = angular.copy(vm.defaultMentorshipWeblinkData)
  if (form) {
   form.$setPristine();
   form.$setUntouched();
  }
 };

 vm.revertMentorshipWeblink = function (mentorshipWeblink, mentorshipWeblinkCopy) {
  mentorshipWeblink = mentorshipWeblinkCopy;
  /*
   $filter('filter')
   (vm.mentorshipWeblinksManager.mentorshipWeblinks, {id: mentorshipWeblinkId}, true)[0]
   = angular.copy($filter('filter')
   (vm.mentorshipWeblinksCopy, {id: mentorshipWeblinkId}, true)[0]);
   if (mentorshipWeblink.length && mentorshipWeblinkCopy.length) {
   // vm.mentorshipWeblinksManager.mentorshipWeblinks angular.copy(vm.mentorshipWeblinksCopy);
   }
   */
 };






 vm.editedWeblink = null;

 $scope.$watch(angular.bind(this, function () {
  return vm.mentorshipWeblinks;
 }), function () {
  //vm.remainingCount = filterFilter(mentorshipWeblinks, {completed: false}).length;
  vm.doneCount = vm.mentorshipWeblinksManager.mentorshipWeblinks.length - vm.remainingCount;
  vm.allChecked = !vm.remainingCount;
  //MentorshipWeblinkService.put(vm.mentorshipWeblinks);
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




 vm.editWeblink = function (mentorshipWeblink) {
  vm.editedWeblink = mentorshipWeblink;
  // Clone the original mentorshipWeblink to restore it on demand.
  vm.originalWeblink = angular.copy(mentorshipWeblink);
 };


 vm.doneEditing = function (mentorshipWeblink) {
  vm.editedWeblink = null;
  mentorshipWeblink.title = mentorshipWeblink.title.trim();

  if (!mentorshipWeblink.title) {
   vm.removeWeblink(mentorshipWeblink);
  }
 };

 vm.openMentorshipWeblink = function (mentorshipWeblink) {
  var modalInstance = $uibModal.open({
   animation: true,
   templateUrl: 'mentorship-weblink-modal.html',
   controller: 'MentorshipWeblinkCtrl as mentorshipWeblinkCtrl',
   backdrop: 'static',
   size: 'xl',
   resolve: {
    mentorshipWeblinkData: function () {
     return mentorshipWeblink;
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
 vm.mentorshipWeblinksManager.getMentorshipWeblinks(vm.mentorshipId);
};

mentorshipWeblinksCtrl.$inject = [
 'MentorshipWeblinksManager',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$uibModal',
 '$log',
 '$filter'];

angular.module("app.mentorship").controller('MentorshipWeblinksCtrl', mentorshipWeblinksCtrl);
